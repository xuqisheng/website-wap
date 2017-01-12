define(function (require, exports, module) {
    var rsa = require('module/rsaUtils');

    var EncryptedPwd = function (exponent, modulus) {
        return function (password) {
            rsa.setMaxDigits(130);
            var key = new rsa.RSAKeyPair(exponent, '', modulus);
            return rsa.encryptedString(key, password);
        };
    };
    module.exports = EncryptedPwd
});