import validator from 'validator';

function validatePhone(phone){
    return validator.isMobilePhone(phone,'vi-VN')
}

function validateEmail(email){
    return validator.isEmail(email)
}


export {validatePhone, validateEmail}