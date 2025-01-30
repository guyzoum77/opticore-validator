import {RuleSetType} from "../types/ruleSet.type";
import {requiredRule} from "../rules/required.rule";
import {minLengthRule} from "../rules/minLength.rule";
import {maxLengthRule} from "../rules/maxLength.rule";
import {emailRule} from "../rules/email.rule";
import {passwordRule} from "../rules/password.rule";
import {dateRule} from "../rules/date.rule";
import {dateTimeRule} from "../rules/dateTime.rule";
import {booleanRule} from "../rules/boolean.rule";
import {sizeRule} from "../rules/size.rule";
import {ipv4Rule} from "../rules/ipv4.rule";
import {ipv6Rule} from "../rules/ipv6.rule";
import {urlRule} from "../rules/url.rule";
import {objectRule} from "../rules/object.rule";
import {digitRule} from "../rules/digit.rule";
import {integerRule} from "../rules/integer.rule";
import {ipRule} from "../rules/ip.rule";
import {arrayRule} from "../rules/array.rule";
import {notBlankRule} from "../rules/notBlank.rule";
import {containsRule} from "../rules/contains.rule";
import {equalsRule} from "../rules/equals.rule";
import {abaRoutingRule} from "../rules/abaRouting.rule";
import {alphaRule} from "../rules/alpha.rule";
import {alphanumericRule} from "../rules/alphanumeric.rule";
import {asciiRule} from "../rules/ascii.rule";
import {base32Rule} from "../rules/base32.rule";
import {base58Rule} from "../rules/base58.rule";
import {base64Rule} from "../rules/base64.rule";
import {bicRule} from "../rules/bic.rule";
import {btcAddressRule} from "../rules/btcAddress.rule";
import {byteLengthRule} from "../rules/byteLength.rule";
import {creditCardRule} from "../rules/creditCard.rule";
import {currencyRule} from "../rules/currency.rule";
import {dataURIRule} from "../rules/dataURI.rule";
import {floatRule} from "../rules/float.rule";
import {containsSpecialCharRule} from "../rules/containsSpecialChar.rule";
import {containsLowercaseRule} from "../rules/containsLowercase.rule";
import {containsDigitRule} from "../rules/containsDigit.rule";
import {containsUppercaseRule} from "../rules/containsUppercase.rule";
import {afterRule} from "../rules/after.rule";
import {beforeRule} from "../rules/before.rule";
import {decimalRule} from "../rules/decimal.rule";
import {divisibleByRule} from "../rules/divisibleBy.rule";
import {eanRule} from "../rules/EAN.rule";
import {emptyRule} from "../rules/empty.rule";
import {fqdnRule} from "../rules/fqdn.rule";
import {freightContainerIDRule} from "../rules/freightContainerID.rule";
import {fullWidthRule} from "../rules/fullWidth.rule";
import {halfWidthRule} from "../rules/halfWidth.rule";
import {hashRule} from "../rules/hash.rule";
import {hexadecimalRule} from "../rules/hexadecimal.rule";
import {hexColorRule} from "../rules/hexColor.rule";
import {hslRule} from "../rules/hsl.rule";
import {identityCardRule} from "../rules/identityCard.rule";
import {imeiRule} from "../rules/imei.rule";
import {inRule} from "../rules/in.rule";
import {intRule} from "../rules/int.rule";
import {bnRule} from "../rules/bn.rule";
import {rcRule} from "../rules/rc.rule";
import {issnRule} from "../rules/issn.rule";
import {jsonRule} from "../rules/json.rule";
import {jwtRule} from "../rules/jwt.rule";
import {latLongRule} from "../rules/latLong.rule";
import {lengthRule} from "../rules/length.rule";
import {iso4217Rule} from "../rules/iso4217.rule";
import {iso6346Rule} from "../rules/iso6346.rule";
import {iso6391Rule} from "../rules/iso6391.rule";
import {iso8601Rule} from "../rules/iso8601.rule";
import {iso31661Alpha2Rule} from "../rules/iso31661Alpha2.rule";
import {iso31661Alpha3Rule} from "../rules/iso31661Alpha3.rule";

export const rulesConstant: RuleSetType = {
    required: requiredRule,
    minLength: minLengthRule,
    maxLength: maxLengthRule,
    email: emailRule,
    password: passwordRule,
    date: dateRule,
    dateTime: dateTimeRule,
    boolean: booleanRule,
    size: sizeRule,
    ipv4: ipv4Rule,
    ipv6: ipv6Rule,
    url: urlRule,
    object: objectRule,
    digit: digitRule,
    integer: integerRule,
    ip: ipRule,
    array: arrayRule,
    notBlank: notBlankRule,
    contains: containsRule,
    equals: equalsRule,
    abaRouting: abaRoutingRule,
    alpha: alphaRule,
    alphanumeric: alphanumericRule,
    ascii: asciiRule,
    base32: base32Rule,
    base58: base58Rule,
    base64: base64Rule,
    bic: bicRule,
    btcAddress: btcAddressRule,
    byteLength: byteLengthRule,
    creditCard: creditCardRule,
    currency: currencyRule,
    containsSpecialChar: containsSpecialCharRule,
    containsLowercase: containsLowercaseRule,
    containsUppercase: containsUppercaseRule,
    containsDigit: containsDigitRule,
    dataURI: dataURIRule,
    float: floatRule,
    after: afterRule,
    before: beforeRule,
    decimal: decimalRule,
    divisibleBy: divisibleByRule,
    ean: eanRule,
    empty: emptyRule,
    fqdn: fqdnRule,
    freightContainerID: freightContainerIDRule,
    fullWidth: fullWidthRule,
    halfWidth: halfWidthRule,
    hash: hashRule,
    hexadecimal: hexadecimalRule,
    hexColor: hexColorRule,
    hsl: hslRule,
    identityCard: identityCardRule,
    imei: imeiRule,
    in: inRule,
    int: intRule,
    bn: bnRule,
    rc: rcRule,
    issn: issnRule,
    json: jsonRule,
    jwt: jwtRule,
    latLong: latLongRule,
    length: lengthRule,
    iso4217: iso4217Rule,
    iso6346: iso6346Rule,
    iso6391: iso6391Rule,
    iso8601: iso8601Rule,
    iso31661Alpha2: iso31661Alpha2Rule,
    iso31661Alpha3: iso31661Alpha3Rule,
};