import {Validator} from "../src";
import {ValidationResultInterface} from "../src/core/interfaces/validationResult.interface";

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
    eventDate: [
        { rule: 'after', args: [{ date: '2024-01-01T00:00:00Z' }], message: 'The event date must be after January 1, 2024.' },
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
        { rule: 'date', options: { format: 'dd/MM/yyyy', strictMode: true, delimiters: ['-', '/'] } }
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
        { rule: 'contains', args: ['admin'], options: { ignoreCase: true, minOccurrences: 2 } }
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
    ],
    username1: [
        { rule: 'alphanumeric', options: { locale: 'fr-FR', ignore: '-' } }
    ],
    password1: [
        { rule: 'alphanumeric', options: { locale: 'en-US', ignore: ' -' } }
    ],
    base32Data: [
        { rule: 'base32' }, // Defaults to RFC 4648 Base32 encoding
        { rule: 'base32', options: { crockford: true } } // Uses Crockford's Base32 encoding
    ],
    base64Data: [
        { rule: 'base64' }, // Defaults to standard Base64 encoding
        { rule: 'base64', options: { urlSafe: true } } // Uses URL-safe Base64 encoding
    ],
    active: [
        { rule: 'boolean' }, // Defaults to strict boolean matching
        { rule: 'boolean', options: { loose: true } } // Allows loose boolean matching
    ],
    description: [
        { rule: 'byteLength', options: { min: 10, max: 100 } }, // Byte length between 10 and 100 bytes
        { rule: 'byteLength', options: { encoding: 'utf16', min: 0, max: 50 } } // Byte length up to 50 bytes using UTF-16 encoding
    ],
    cardNumber: [
        { rule: 'creditCard', options: { min: 12, max: 19 } }, // Credit card number length between 12 and 19 digits
        { rule: 'creditCard', options: { min: 16 } } // The Credit card number must be at least 16 digits
    ],
    price: [
        { rule: 'currency', options: { symbol: '€', symbol_position: 'suffix' } }, // Validate with € as suffix
        { rule: 'currency', options: { symbol: '$', symbol_position: 'prefix' } }  // Validate with $ as prefix
    ],
    registrationDate: [
        {
            rule: 'before',
            args: [{ date: '2024-01-01T00:00:00Z' }], // Must be before January 1, 2024
            message: 'Registration date must be before January 1, 2024.',
        },
    ],
    amount: [
        {
            rule: 'decimal',
            args: [{ forceDecimal: true, decimalPlaces: [2], locale: 'en-US' }], // Must have 2 decimal places and a decimal point
            message: 'Amount must be a decimal with exactly 2 places.',
        },
    ],
    quantity: [
        {
            rule: 'divisibleBy',
            args: [5], // Must be divisible by 5
            message: 'Quantity must be divisible by 5.',
        },
    ],
    productCode: [
        {
            rule: 'ean',
            message: 'Product code must be a valid EAN-8 or EAN-13.',
        },
    ],
    notes: [
        {
            rule: 'empty',
            message: 'Notes must be empty.',
        },
    ],
    domain: [
        {
            rule: 'fqdn',
            args: [{ requireTld: true, allowUnderscores: false, allowTrailingDot: true }],
            message: 'The domain must be a valid FQDN.',
        },
    ],
    containerID: [
        {
            rule: 'freightContainerID',
            message: 'The container ID must be a valid Freight Container ID.',
        },
    ],
    fullName: [
        {
            rule: 'fullWidth',
            message: 'The username must contain at least one full-width character.',
        },
    ],
    itemCode: [
        {
            rule: 'halfWidth',
            message: 'The product code must contain only half-width characters.',
        },
    ],
    fileHash: [
        {
            rule: 'hash',
            args: [{ algorithm: 'sha256' }],
            message: 'The file hash must be a valid SHA-256 hash.',
        },
    ],
    colorCode: [
        {
            rule: 'hexadecimal',
            message: 'The color code must be a valid hexadecimal string.',
        },
    ],
    backgroundColor: [
        {
            rule: 'hexColor',
            message: 'The background color must be a valid hexadecimal color code.',
        },
    ],
    color: [
        {
            rule: 'hsl',
            message: 'The color must be a valid HSL or HSLA value.',
        },
    ],
    idNumber: [
        {
            rule: 'identityCard',
            args: [{ country: 'US' }], // Validate against US format
            message: 'The ID number must be a valid US identity card number.',
        },
    ],
    deviceImei: [
        {
            rule: 'imei',
            message: 'The IMEI number must be a valid 15-digit identifier.',
        },
    ],
    status: [
        {
            rule: 'in',
            args: [['active', 'inactive', 'pending']],
            message: 'The status must be one of the allowed values: active, inactive, pending.',
        },
    ],
    newAge: [
        {
            rule: 'int',
            message: 'The age must be an integer.',
        },
    ],
    bookIsbn: [
        {
            rule: 'isbn',
            message: 'The ISBN must be a valid ISBN-10 or ISBN-13.',
        },
    ],
    securityIsin: [
        {
            rule: 'isin',
            message: 'The ISIN must be a valid ISIN.',
        },
    ],
    registrationCode: [
        {
            rule: 'isRC',
            message: 'The Registration Code must be a valid format.',
        },
    ],
    publicationISSN: [
        {
            rule: 'issn',
            message: 'The ISSN must be a valid format.',
        },
    ],
    jsonData: [
        {
            rule: 'json',
            message: 'The value must be a valid JSON string.',
        },
    ],
    token: [
        {
            rule: 'jwt',
            message: 'The value must be a valid JWT.',
        },
    ],
    location: [
        {
            rule: 'latLong',
            message: 'The value must be a valid latitude and longitude pair.',
        },
    ],
    familyName: [
        {
            rule: 'length',
            options: { min: 3, max: 10 },
            message: 'family name must be between 3 and 10 characters long.',
        },
    ],
    ownTags: [
        {
            rule: 'length',
            options: { min: 1, max: 5 },
            message: 'There must be between 1 and 5 tags.',
        },
    ],
    currencyCode: [
        { rule: 'iso4217', message: 'Invalid ISO 4217 currency code.' }
    ],
    containedID: [
        { rule: 'iso6346', message: 'Invalid ISO 6346 container identification number.' }
    ],
    language: [
        { rule: 'iso6391', message: 'Invalid ISO 639-1 language code.' }
    ],
    timestamp: [
        { rule: 'iso8601', message: 'Invalid ISO 8601 date/time format.' }
    ],
    countryCode: [
        { rule: 'iso31661Alpha2', message: 'Invalid ISO 3166-1 Alpha-2 country code.' }
    ],
    anotherCountryCode: [
        { rule: 'iso31661Alpha3', message: 'Invalid ISO 3166-1 Alpha-3 country code.' }
    ]
};

const data = {
    name: 'Joqw',
    age: 25,
    email: 'emia@veone.com',
    password: 'Kghs@$word1!',
    birthdate: '10/10/2021', // or '10-10-2021' based on the options
    appointment: '2023-07-03T10:30:00Z',
    isActive: true,
    tags: ['node', 'typescript', 'validation'],
    metadata: { key: 'value' },
    ipAddress: '192.168.0.1',
    website: 'https://example.com',
    routingNumber: '123456789',
    firstName: 'John',
    username: 'adminadmin',
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
    equalsField: 'expectedValue',
    username1: 'Jean-Paul123', // Allows hyphen as a per ignore option
    password1: 'Secret123', // Allows spaces and hyphen as per ignore option
    base32Data: 'GEZDGNBV', // Example Base32 encoded string
    base64Data: 'VGhpcyBpcyBhIGJhc2U2NCBlbmNvZGluZyBzdHJpbmc=', // Example Base64 encoded string
    active: 'True', // Example boolean value
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // Example string
    cardNumber: '1234-5678-9012-3456', // Example credit card number
    price: '$1.234,56', // Example currency amount with € as suffix
    eventDate: '2023-12-30T23:59:59Z',
    registrationDate: '2024-02-01T00:00:00Z',
    amount: "234",
    quantity: 7,
    productCode: '1234567890123',
    notes: 'Some content',
    domain: 'example',
    containerID: 'ABCD1234568',
    fullName: 'John Smith',
    itemCode: 'ＡＢＣ123',
    fileHash: 'mypassword',
    colorCode: 'XYZ123',
    backgroundColor: '123456',
    color: 'hsl(400, 50%, 50%)',
    idNumber: '123-45-6789',
    deviceImei: '490154203237519',
    status: 'archived',
    newAge: 25.5, // '25.5' also invalid
    bookIsbn: '1234567890',
    securityIsin: '123456789012',
    registrationCode: '12345678',
    publicationISSN: '1234-56789',
    jsonData: '{"key": "value"', // or 'Just a string' or '{"key": "value"'; or '{"key": "value" , }'
    token: 'header.payload.signature.extra',
    location: '37.7749,-200.4194',
    familyName: 'j',
    ownTags: [],
    currencyCode: 123,
    containedID: "XYZU6543210", // or "123U6543210" or "ABCD1234567" are invalide
    language: "xx", // "eng" or 123 are invalide
    timestamp: "29-01-2024", // "2024-02-30T12:30:45Z" is invalid
    countryCode: "XX",
    anotherCountryCode: "XXX"
};

const validator: Validator = new Validator(schema);
const errors: ValidationResultInterface = validator.validate(data);
console.log(errors);