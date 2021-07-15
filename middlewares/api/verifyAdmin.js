const jwt = require('jsonwebtoken');
const authService = require('../../services/authService');
/*function verifyToken(req, res, next){

    if(!req.headers.authorization){
        return res.status(401).send('Unthorize request')
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unthorize request')
    }
    const payload = jwt.verify(token, 'secretKey')
    console.log(payload);
    req.storeId = payload._id;
 next();
},*/

function veriryAdmin(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send('Unthorize request')
   }
  try {
   const token = req.headers.authorization.split(' ')[1];;
   console.log(token)
    let perfil = authService.VerifyToken(token).then(data => {
      console.log(data)
        if (data) {
            if (data.role > 2) {
             console.log('es todo ok es admin ************************** ');
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

module.exports = veriryAdmin;