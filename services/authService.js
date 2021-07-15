const { Store, User } = require('../database/models');
const jwt = require('jsonwebtoken');
const CryptoJs = require('crypto-js');
const { generate } = require('generate-password');


const AuthService = {

    Identify: async (email, password) => {
    let store = await Store.findOne({where: {email: email}});
    if (store) {
      let cryptPass = CryptoJs.MD5(password).toString();
      if (store.password == cryptPass) {
        return store;
      }
    }
    return false;
  },

  ChangePassword: async (store, passwordNew) => {
    try{
     let password = CryptoJs.MD5(passwordNew).toString();
     await Store.update({password: password}, {where:{id:store.id}});
    return true;
    }catch(error){
      return false;
    }
  },

  GenerateToken: async (store) => {
    store.password = '';
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) * 3600,
      data: {
        _id: store.id,
        username: store.name,
        role: store.role,
        userId: store.userId
      }
    },
      process.env.JWT_SECRET_KEY);
    return token;
  },
/**
 * 
 * @param {to verify a token} token 
 * @returns 
 */
  VerifyToken: async(token) => {
    try {
      let data = jwt.verify(token, process.env.JWT_SECRET_KEY).data;
      return data;
    } catch(error) {
      return false;
    }
  },

 ResetPassword:   async(email) => {
    let store = await Store.findOne({where: {email: email}});
      if (store) {
        let randonPassword = generate({
          length: 8,
          numbers: true,
          lowercase: false,
          uppercase: false
        });
        let password = CryptoJs.MD5(randonPassword).toString();
        let password2 = CryptoJs.MD5(password).toString();
        let storeUpdate = await Store.update({password:password2}, {
          where: {id: store.id}})
         if(storeUpdate){
           return randonPassword;
         }else{
          return false;
         }
    }else{
      return false;
      }
    }


}

module.exports = AuthService;