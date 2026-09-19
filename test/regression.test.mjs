// Regression tests for opticore-validator 1.0.10 — run with `npm run build && npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { Validator, validate } = require("../dist/index.js");

const check = (rules, value) => Object.keys(new Validator({ f: rules }).validate({ f: value })).length === 0;

test("length: never writes the validated value to the console (a password must not reach the logs)", () => {
    const logged = [];
    const original = console.log;
    console.log = (...args) => logged.push(args.join(" "));
    try {
        new Validator({ password: [{ rule: "length", args: [{ min: 1, max: 64 }] }] }).validate({ password: "Sup3r-S3cret!" });
    } finally {
        console.log = original;
    }
    assert.deepEqual(logged, []);
});

test("length: min and max are optional (README: defaults { min: 0, max: undefined })", () => {
    assert.equal(check([{ rule: "length" }], "abc"), true);
    assert.equal(check([{ rule: "length", args: [{ min: 2 }] }], "abc"), true);
    assert.equal(check([{ rule: "length", args: [{ min: 4 }] }], "abc"), false);
    assert.equal(check([{ rule: "length", args: [{ max: 2 }] }], "abc"), false);
    assert.equal(check([{ rule: "length", args: [{ min: 1, max: 5 }] }], "abc"), true);
});

test("length: still rejects non string / array values", () => {
    for (const bad of [undefined, null, 12, true, {}]) assert.equal(check([{ rule: "length", args: [{ min: 0 }] }], bad), false);
});

test("boolean: accepts real JSON booleans as well as their string forms", () => {
    assert.equal(check([{ rule: "boolean" }], true), true);
    assert.equal(check([{ rule: "boolean" }], false), true);
    assert.equal(check([{ rule: "boolean" }], "true"), true);
    assert.equal(check([{ rule: "boolean" }], "0"), true);
    for (const bad of ["yes", 1, 0, null, {}, []]) assert.equal(check([{ rule: "boolean" }], bad), false);
});

test("matches: documented in the README and now implemented", () => {
    assert.equal(check([{ rule: "matches", args: [/^[A-Za-z0-9_-]{4,8}$/] }], "ab_c-9Z"), true);
    assert.equal(check([{ rule: "matches", args: ["^foo$", "i"] }], "FOO"), true);
    assert.equal(check([{ rule: "matches", args: [/^foo$/] }], "bar"), false);
});

test("matches: never throws — non-strings and invalid patterns simply fail", () => {
    assert.equal(check([{ rule: "matches", args: [/x/] }], { toString: () => "x" }), false);
    assert.equal(check([{ rule: "matches", args: [/x/] }], 5), false);
    assert.equal(check([{ rule: "matches", args: ["("] }], "x"), false);
});

test("matches: a /g or /y regex is not stateful across calls", () => {
    const rules = [{ rule: "matches", args: [/abc/g] }];
    assert.equal(check(rules, "abc"), true);
    assert.equal(check(rules, "abc"), true);
});

test("validate() middleware: a JSON body with a boolean field passes, a wrong type answers 400", () => {
    const middleware = validate({ rememberMe: [{ rule: "boolean" }] });
    const run = (body) => {
        let status = null;
        let nextCalled = false;
        middleware({ body, method: "POST", originalUrl: "/x" }, { status(code) { status = code; return { json() {} }; } }, () => { nextCalled = true; });
        return { status, nextCalled };
    };
    assert.deepEqual(run({ rememberMe: true }), { status: null, nextCalled: true });
    assert.equal(run({ rememberMe: { $ne: 1 } }).status, 400);
});

test("byteLength: the documented positional form (min, max?) is enforced — it used to accept everything", () => {
    assert.equal(check([{ rule: "byteLength", args: [32] }], "a".repeat(31)), false);
    assert.equal(check([{ rule: "byteLength", args: [32] }], "a".repeat(32)), true);
    assert.equal(check([{ rule: "byteLength", args: [1, 512] }], "a".repeat(600)), false);
    assert.equal(check([{ rule: "byteLength", args: [1, 512] }], ""), false);
    assert.equal(check([{ rule: "byteLength", args: [1, 512] }], "a".repeat(512)), true);
    assert.equal(check([{ rule: "byteLength", args: [1, 4] }], "éé"), true, "bytes, not characters");
    assert.equal(check([{ rule: "byteLength", args: [1, 3] }], "éé"), false);
});

test("byteLength: the options-object form keeps working", () => {
    assert.equal(check([{ rule: "byteLength", args: [{ min: 2, max: 4 }] }], "abc"), true);
    assert.equal(check([{ rule: "byteLength", args: [{ max: 2 }] }], "abc"), false);
    assert.equal(check([{ rule: "byteLength", args: [{ min: 1 }] }], 5), false);
});

test("int: honours min / max / lt / gt (documented) and accepts integer strings", () => {
    assert.equal(check([{ rule: "int", args: [{ min: 2, max: 100 }] }], 1), false);
    assert.equal(check([{ rule: "int", args: [{ min: 2, max: 100 }] }], 100), true);
    assert.equal(check([{ rule: "int", args: [{ min: 2, max: 100 }] }], "50"), true);
    assert.equal(check([{ rule: "int", args: [{ lt: 10 }] }], 10), false);
    assert.equal(check([{ rule: "int", args: [{ gt: 10 }] }], 11), true);
    for (const bad of ["2.5", "abc", "", " 3", "1e2", "0x10", "007", null, undefined, {}, [], 2.5, NaN, Infinity, 2 ** 60]) assert.equal(check([{ rule: "int" }], bad), false, String(bad));
    assert.equal(check([{ rule: "int" }], 7), true);
});

const validateWith = (schema, data, options) => new Validator(schema).validate(data, options);

test("Validator: by default every rule of every field runs, an absent optional field included (unchanged)", () => {
    const errors = validateWith({ nick: [{ rule: "string" }], name: [{ rule: "required" }] }, {});
    assert.deepEqual(Object.keys(errors).sort(), ["name", "nick"]);
});

test("Validator skipAbsentOptional: an absent field WITHOUT `required` is skipped, one WITH `required` is still reported", () => {
    const schema = { nick: [{ rule: "string" }, { rule: "minLength", args: [3] }], name: [{ rule: "required" }, { rule: "string" }] };
    const errors = validateWith(schema, {}, { skipAbsentOptional: true });
    assert.deepEqual(Object.keys(errors), ["name"]);
});

test("Validator skipAbsentOptional: a PRESENT optional field is still validated (null and \"\" count as present)", () => {
    const schema = { nick: [{ rule: "string" }, { rule: "minLength", args: [3] }] };
    assert.deepEqual(validateWith(schema, { nick: "ab" }, { skipAbsentOptional: true }).nick.length, 1);
    assert.deepEqual(Object.keys(validateWith(schema, { nick: null }, { skipAbsentOptional: true })), ["nick"]);
    assert.deepEqual(Object.keys(validateWith(schema, { nick: "" }, { skipAbsentOptional: true })), ["nick"]);
    assert.deepEqual(validateWith(schema, { nick: "abc" }, { skipAbsentOptional: true }), {});
});

test("Validator skipAbsentOptional: env-style use — only the configured fields are checked", () => {
    const schema = { PEPPER: [{ rule: "required" }, { rule: "byteLength", args: [32] }], TTL: [{ rule: "matches", args: [/^\d+[smhd]$/] }] };
    assert.deepEqual(validateWith(schema, { PEPPER: "p".repeat(32) }, { skipAbsentOptional: true }), {});
    assert.deepEqual(Object.keys(validateWith(schema, { PEPPER: "p".repeat(32), TTL: "banana" }, { skipAbsentOptional: true })), ["TTL"]);
});

test("validate() middleware behaves exactly as before: optional absent passes, required absent answers 400", () => {
    const middleware = validate({ email: [{ rule: "required" }, { rule: "email" }], phone: [{ rule: "string" }, { rule: "minLength", args: [5] }] });
    const run = (body) => {
        let status = null, nextCalled = false, payload = null;
        middleware({ body, method: "POST", originalUrl: "/x" }, { status(code) { status = code; return { json(p) { payload = p; } }; } }, () => { nextCalled = true; });
        return { status, nextCalled, payload };
    };
    assert.deepEqual(run({ email: "a@b.co" }), { status: null, nextCalled: true, payload: null });
    const missing = run({});
    assert.equal(missing.status, 400);
    assert.deepEqual(Object.keys(missing.payload.errors), ["email"]);
    assert.deepEqual(Object.keys(run({ email: "a@b.co", phone: "12" }).payload.errors), ["phone"]);
});
