const jwt = require('jsonwebtoken');
const authService = require('../../services/authService');

function verirfySeller(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send('Unthorize request')
   }
  try {
   const token = req.headers.authorization.split(' ')[1];
    let perfil = authService.VerifyToken(token).then(data => {
        if (data && data.role > 0) {
             console.log(' ok ************************** ');
             console.log(data)
             next();
            } else {
              console.log('no tiene una cuenta con rol para ejecutar esta action*************************** ')
              return res.status(401).json('Unthorize request');
            }
          });     
  } catch (error) {
    console.log(error);
  }
}

module.exports = verirfySeller;