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
    float: floatRule
};