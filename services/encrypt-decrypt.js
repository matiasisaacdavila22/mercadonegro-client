const CryptoJs = require('crypto-js');

const Encrip = {
    Encrypt: function(metodo) {
     switch (metodo) {
          case keys.MD5:
            return CryptoJs.MD5(text).toString();
            break;
          case keys.AES:
            return CryptoJs.AES.Encrypt(text, keys.AES_SECRET_KEY).toString();
            break;
          case keys.SHA_512:

            break;
          default:
           return 'this type of crypt is not soported'
          break;
        }
  }
}
module.exports = Encrip;