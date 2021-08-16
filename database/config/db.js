/*const Sequelize = require('sequelize');
const sequelize = new Sequelize('mercadongro2','root','',{
    host:'localhost',
    dealect:'mysql',
    logging:false,
    pool:{max:5,min:0,idle:10000}
});

sequelize.authenticate()
.then(()=>{
    console.log('connecter');
})
.catch(err => {
    console.log('Error'+err);
})

module.exports = sequelize;*/