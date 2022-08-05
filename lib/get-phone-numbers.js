
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


module.exports.perform = (phone) => {
    const fullPhoneNumber = phone.dialCode + phone.number;
    const number = phoneUtil.parseAndKeepRawInput(fullPhoneNumber);
    const numbers = {
        number: phone.number,
        internationalNumber: phoneUtil.format(number, PNF.INTERNATIONAL),
        nationalNumber: phoneUtil.format(number, PNF.NATIONAL),
        e164Number: phoneUtil.format(number, PNF.E164),
        countryCode: phoneUtil.getRegionCodeForNumber(number),
        dialCode: phone.dialCode
    };
    return numbers;
};
