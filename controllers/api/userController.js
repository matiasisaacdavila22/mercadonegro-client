const { Store, User } = require('../../database/models');
const jwt = require('jsonwebtoken');
const CryptoJs = require('crypto-js');
const Notifications = require('../../services/notificationes');
const sgMail = require('@sendgrid/mail')
const AuthService = require('../../services/authService');

module.exports = {
    signup: async(req, res) => {
        try{
        console.log(req.body)
        let password = CryptoJs.MD5(req.body.password).toString();
        const userNew = await User.create({
            firstName: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: password,
            phone: req.body.phone,
            photo: '',
            condition: 1,
            role:0
        })
        
          const ns =
                {
                    name:req.body.storeName,
                    email:req.body.storeEmail,
                    password: password,
                    phone: req.body.storePhone,
                    adress: req.body.storeAddress,
                    description: '',
                    photo: '',
                    userId: userNew.id,
                    condition: 1,
                    role: 3
               }
             const newStore = await Store.create(ns)     

     const token = jwt.sign({_id: newStore._id}, 'secretKey')   
     let from = "Departamento Notifications";
     let subject = "Registro in mercadoNegro store✔";
     let html = `<b>Bienvenido ${newStore.name} ya puedes utilizar la plataforma dando click al link</b>
     <a href='http://localhost:4200/security/login'>Entrar</a>`;          
     Notifications.nodemailer(userNew, from, subject, html )
     .then(notificacion => {
        return res.status(200).json(token);
     })
     .catch(function(error){
        console.log('el error es :'+error.message);
    })
}catch(error){
    console.log(error.message)
    return res.status(400).json(error);
}

    },  

    signin: async(req, res) => {
        try{
        const { email, password } = req.body;
        const findStore = await AuthService.Identify(email,password);
        if(!findStore) return res.status(401).json('no se encuentra la tienda');
        const tk = await AuthService.GenerateToken(findStore);      
        return res.status(200).json([{data:findStore,token:tk}]);  
    }catch(error){
        console.log(error.message);
    }     
    },

    changePassword: async(req, res) => {
        try{
        const { email, password, passwordNew } = req.body;
        const findStore = await AuthService.Identify(email,password);
        const changePassword = await AuthService.ChangePassword(findStore, passwordNew);
                let from = "Departamento Notifications";
                let subject = "Cambio de contrasenia✔";
                let html = `<b>${findStore.name} su contrasenia a cambiado!! puedes acceder a la plataforma dando click al link</b>
                <a href='http://localhost:4200/security/login'>Entrar</a>`;          
     Notifications.nodemailer(findStore, from, subject, html )
     .then(confirm =>{
        return res.status(200).json(confirm);
     })
     .catch(error =>{
        return res.status(400).json('error change Password');
     })      
    }catch(error){
        return res.status(400).json(error);
    }            
    },

    reset: async(req, res)=> {
        let email = req.body.email;
        console.log(req.body)
        let password = await AuthService.ResetPassword(email);
         if(password){
            let store = await Store.findOne({where: {email: email}});
            switch (req.body.type){
                 case '1':
                     console.log('********************111111**********')
                    Notifications.nodemailerResetPassword(store, password)
                    .then(notificacion => {
                       return res.status(200).json(password);
                    })
                    .catch(function(error){
                       console.log('el error es :'+error.message);
                   })
                break;
                
                case '2':
                    console.log('********************222222**********')
                    let body = 'Tu nueva clave es :'
                    Notifications.twilioSms(store, password, body )
                    .then(notificacion => {
                       return res.status(200).json(password);
                    })
                    .catch(function(error){
                       console.log('el error es :'+error.message);
                   })
                break;
             }
        }else{
            console.log("store not found");
        }
    },

    update: (req, res) => {
        let store = req.body;
        
       // product.image = req.file ? req.file.filename : req.body.oldImage;

        Store.update(store, {
            where: {id: store.id}
        })
        .then(result => {
            console.log('update susefully')
            return res.status(200);
        })
        .catch(error => res.send(error));
     }

}