import {Validator} from "../src";

const schema = {
    name: [
        { rule: 'required' },
        { rule: 'minLength', args: [3] }
    ],
    age: [
        { rule: 'required' },
        { rule: 'integer' }
    ],
    email: [
        { rule: 'required' },
        { rule: 'email' }
    ],
    password: [
        { rule: 'required', message: 'You must provide a value' },
        { rule: 'minLength', args: [8], message: 'A password must contain min 8 char.' },
        { rule: 'containsUppercase', message: 'You must to add upper case char in the password' },
        { rule: 'containsLowercase', message: 'you need to add lower case char' },
        { rule: 'containsDigit' },
        { rule: 'containsSpecialChar' }
    ],
    birthdate: [
        { rule: 'date' }
    ],
    appointment: [
        { rule: 'dateTime' }
    ],
    isActive: [
        { rule: 'boolean' }
    ],
    tags: [
        { rule: 'array' },
        { rule: 'size', args: [3] }
    ],
    metadata: [
        { rule: 'object' }
    ],
    ipAddress: [
        { rule: 'ip' }
    ],
    website: [
        { rule: 'url' }
    ],
    routingNumber: [
        { rule: 'abaRouting' }
    ],
    firstName: [
        { rule: 'alpha' }
    ],
    username: [
        { rule: 'alphanumeric' }
    ],
    asciiText: [
        { rule: 'ascii' }
    ],
    base32Value: [
        { rule: 'base32' }
    ],
    base58Value: [
        { rule: 'base58' }
    ],
    base64Value: [
        { rule: 'base64' }
    ],
    bicCode: [
        { rule: 'bic' }
    ],
    btcAddress: [
        { rule: 'btcAddress' }
    ],
    byteLengthString: [
        { rule: 'byteLength', args: [5, 10] }
    ],
    creditCardNumber: [
        { rule: 'creditCard' }
    ],
    currencyValue: [
        { rule: 'currency' }
    ],
    dataUri: [
        { rule: 'dataURI' }
    ],
    floatValue: [
        { rule: 'float' }
    ],
    blankField: [
        { rule: 'notBlank' }
    ],
    containsField: [
        { rule: 'contains', args: ['test'] }
    ],
    equalsField: [
        { rule: 'equals', args: ['expectedValue'] }
    ]
};

const data = {
    name: 'Jo',
    age: 25,
    email: 'invalid-email',
    password: 'word1!',
    birthdate: '2021-10-10',
    appointment: '2023-07-03T10:30:00Z',
    isActive: true,
    tags: ['node', 'typescript', 'validation'],
    metadata: { key: 'value' },
    ipAddress: '192.168.0.1',
    website: 'https://example.com',
    routingNumber: '123456789',
    firstName: 'John',
    username: 'john123',
    asciiText: 'ascii',
    base32Value: 'MY======',
    base58Value: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
    base64Value: 'SGVsbG8=',
    bicCode: 'DEUTDEFF',
    btcAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    byteLengthString: 'hello',
    creditCardNumber: '4111111111111111',
    currencyValue: '$100.00',
    dataUri: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
    floatValue: 123.45,
    blankField: ' ',
    containsField: 'testString',
    equalsField: 'expectedValue'
};

const validator = new Validator(schema);
const errors = validator.validate(data);

console.log(errors);