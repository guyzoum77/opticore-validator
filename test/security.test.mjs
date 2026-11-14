// Security tests for opticore-validator, run against the built package: `npm run build && npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { Validator, validate } = require("../dist/index.cjs");

const passes = (rule, value, ...args) => Object.keys(new Validator({ f: [{ rule, args }] }).validate({ f: value })).length === 0;

/** Runs `fn` and fails if it takes longer than `limitMs` (catastrophic / quadratic backtracking). */
const fast = (label, fn, limitMs = 150) => {
    const started = performance.now();
    fn();
    const elapsed = performance.now() - started;
    assert.ok(elapsed < limitMs, `${label} took ${elapsed.toFixed(1)} ms`);
};

// ---- ReDoS: inputs of the size an Express body (100 KB) allows ----

test("email: a long hostile address is rejected in linear time (was quadratic: ~0.5 s for 30 KB)", () => {
    fast("email dots", () => assert.equal(passes("email", "a@" + ".".repeat(100_000) + "@"), false));
    fast("email labels", () => assert.equal(passes("email", "a@a" + ".a".repeat(50_000) + " "), false));
    assert.equal(passes("email", "john.doe@example.com"), true);
    assert.equal(passes("email", "a".repeat(250) + "@b.co"), false, "over the RFC 5321 254-character limit");
});

test("dataURI: a long run of spaces before an invalid character is rejected in linear time", () => {
    fast("dataURI", () => assert.equal(passes("dataURI", "data:," + " ".repeat(100_000) + "\u0000"), false));
    assert.equal(passes("dataURI", "data:text/plain,hello%20world"), true);
    assert.equal(passes("dataURI", 42), false);
});

test("fqdn (allowUnderscores): linear time, and a bare word is no longer a valid FQDN", () => {
    fast("fqdn", () => assert.equal(passes("fqdn", "a".repeat(100_000) + "!", { allowUnderscores: true }), false));
    assert.equal(passes("fqdn", "hello", { allowUnderscores: true }), false);
    assert.equal(passes("fqdn", "_dmarc.example.com", { allowUnderscores: true }), true);
    assert.equal(passes("fqdn", "a.example.com"), true);
    assert.equal(passes("fqdn", "a".repeat(64) + ".com"), false, "label over 63 characters");
    assert.equal(passes("fqdn", ("a".repeat(60) + ".").repeat(5) + "com"), false, "name over 253 characters");
});

test("every string rule stays fast on 100 KB adversarial inputs", () => {
    const rules = ["email", "url", "fqdn", "dataURI", "hsl", "decimal", "dateTime", "iso8601", "base64", "base32", "base58",
        "alpha", "alphanumeric", "ascii", "hexadecimal", "hexColor", "ipv4", "ipv6", "ip", "creditCard", "currency",
        "json", "jwt", "latLong", "fullWidth", "halfWidth", "password", "contains", "notBlank", "btcAddress", "bic", "in"];
    const payloads = [" ".repeat(100_000) + "!", "a".repeat(100_000) + "!", "1".repeat(100_000) + "x", "a@".repeat(50_000),
        ".".repeat(100_000), "a.".repeat(50_000) + "!", "data:," + "a ".repeat(50_000) + "\u0000", "1,".repeat(50_000) + "x"];
    for (const rule of rules) {
        for (const payload of payloads) {
            fast(`${rule}(${JSON.stringify(payload.slice(0, 6))}…)`, () => {
                try { passes(rule, payload, ...(rule === "contains" ? ["x"] : [])); } catch { /* a rule may reject loudly; it must not hang */ }
            }, 250);
        }
    }
});

// ---- prototype pollution / inherited members ----

test("a payload cannot satisfy `required` through an inherited Object.prototype member", () => {
    const schema = { toString: [{ rule: "required" }], constructor: [{ rule: "required" }], hasOwnProperty: [{ rule: "required" }] };
    const errors = new Validator(schema).validate({});
    assert.deepEqual(Object.keys(errors).sort(), ["constructor", "hasOwnProperty", "toString"]);
});

test("a schema field named __proto__ reports its errors instead of silently replacing the error bag's prototype", () => {
    const schema = JSON.parse('{"__proto__": [{"rule": "required"}], "name": [{"rule": "string"}]}');
    const errors = new Validator(schema).validate(JSON.parse('{"name": 5}'));
    assert.ok(Object.hasOwn(errors, "__proto__"), JSON.stringify(errors));
    assert.ok(Object.hasOwn(errors, "name"));
    assert.equal(Object.getPrototypeOf(errors), Object.prototype);
});

test("a hostile JSON body with __proto__ / constructor.prototype keys pollutes nothing", () => {
    const body = JSON.parse('{"__proto__": {"polluted": "yes", "isAdmin": true}, "constructor": {"prototype": {"polluted": "yes"}}, "email": "a@b.co"}');
    const errors = new Validator({ email: [{ rule: "email" }], isAdmin: [{ rule: "boolean" }] }).validate(body, { skipAbsentOptional: true });
    assert.deepEqual(errors, {});
    assert.equal({}.polluted, undefined);
    assert.equal({}.isAdmin, undefined);
});

test("rule names are looked up as own rules only (no Object.prototype member used as a rule)", () => {
    for (const rule of ["constructor", "toString", "__proto__", "hasOwnProperty"]) {
        assert.throws(() => new Validator({ f: [{ rule }] }).validate({ f: "x" }), /not defined/);
    }
});

test("locale / country options named after Object.prototype members fall back instead of throwing", () => {
    assert.equal(passes("alpha", "abc", { locale: "constructor" }), true);
    assert.equal(passes("alphanumeric", "abc1", { locale: "__proto__" }), true);
    assert.equal(passes("identityCard", "AB-12", { country: "toString" }), true);
});

test("a null / undefined payload is validated as empty instead of throwing", () => {
    assert.deepEqual(Object.keys(new Validator({ f: [{ rule: "required" }] }).validate(null)), ["f"]);
    assert.deepEqual(new Validator({ f: [{ rule: "string" }] }).validate(undefined, { skipAbsentOptional: true }), {});
});

// ---- the validate() middleware ----

const runMiddleware = (schema, body, enums) => {
    const res = { code: undefined, body: undefined, status(c) { this.code = c; return this; }, json(b) { this.body = b; return this; } };
    let nextCalled = false;
    validate(schema, enums)({ body, method: "POST", originalUrl: "/x" }, res, () => { nextCalled = true; });
    return { res, nextCalled };
};

test("validate(): an enum field named after an inherited member is not satisfied by Object.prototype", () => {
    const { res, nextCalled } = runMiddleware({}, JSON.parse('{"toString": "admin"}'), { toString: ["user"] });
    assert.equal(nextCalled, false);
    assert.equal(res.code, 400);
});

test("validate(): a __proto__ enum field still reports its error", () => {
    const { res, nextCalled } = runMiddleware({}, JSON.parse('{"__proto__": "admin"}'), JSON.parse('{"__proto__": ["user"]}'));
    assert.equal(nextCalled, false);
    assert.ok(Object.hasOwn(res.body.errors, "__proto__"));
});

test("validate(): the 400 response never echoes a stack trace", () => {
    const { res } = runMiddleware({ email: [{ rule: "email" }] }, { email: "nope" });
    assert.equal(res.code, 400);
    assert.ok(!JSON.stringify(res.body).includes("    at "));
});

// ---- rules that crashed at runtime (ReferenceError) ----

test("in (ISIN) no longer throws a ReferenceError and checks the Luhn digit", () => {
    assert.equal(passes("in", "US0378331005"), true);
    assert.equal(passes("in", "US0378331006"), false);
    assert.equal(passes("in", 12), false);
});

test("before with a format no longer hits an undefined parseDate", () => {
    const originalError = console.error;
    const errors = [];
    console.error = (...a) => errors.push(a.join(" "));
    try {
        assert.equal(passes("before", "2020-01-01", { date: "2021-01-01", format: "YYYY-MM-DD" }), true);
    } finally {
        console.error = originalError;
    }
    assert.deepEqual(errors, []);
});

test("currency: the pattern is anchored at the end whatever the symbol", () => {
    assert.equal(passes("currency", "€1,000.00", { symbol: "€" }), true);
    assert.equal(passes("currency", "1,000.00garbage", { symbol: "€" }), false);
});
