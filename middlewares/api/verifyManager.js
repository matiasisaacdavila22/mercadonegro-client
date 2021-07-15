const jwt = require('jsonwebtoken');
const authService = require('../../services/authService');

function veriryManager(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send('Unthorize request')
   }
  try {
   const token = req.headers.authorization.split(' ')[1];;
   console.log(token)
    let perfil = authService.VerifyToken(token).then(data => {
      console.log(data)
        if (data) {
            if (data.role > 1) {
             console.log('es todo ok ************************** ');
             next();
            } else {
              console.log('no tiene una cuenta con rol para ejecutar esta action*************************** ')
              return res.status(401).json('Unthorize request');
            }
          }else{
            console.log('no tiene un token valido*************************** ');
            return res.status(401).json('Unthorize request');
        } 
      });  
          
  } catch (error) {
    console.log(error);
  }
}

module.exports = veriryManager;