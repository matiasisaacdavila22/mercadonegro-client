const sgMail = require('@sendgrid/mail')
const nodemailer = require("nodemailer");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const notifications = {

sendEmail: async (user, sandboxMode = false) => {
		console.log(user)
		const msg = {
			to:user.email,
			from: process.env.SENDGRID_EMAIL_FROM,
			subject: 'Bienvenido a MercadoNegro',
			text: 'Bienvenida a bordo de MercadoNegroStore',
			html:`<strong>bienvenido a bordo ${user.name}</strong><br><strong>https://ecomerce-dh-matias-davila.herokuapp.com/user/login</strong>`,
			mail_settings: {
				sandbox_mode: {
					enable: true//sandboxMode
				}
			}
		};

		let respuesta =	await sgMail.send(msg);
	
        console.log(respuesta)
		return respuesta;

	},
	
async sendEmail2(user){
	const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: user.email, // Change to your recipient
  from: process.env.SENDGRID_EMAIL_FROM, // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
},


async twilioSms(user, password='', body='') {
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: `${body} ${password}`,
     from: process.env.TWILIO_FROM,
     to: '+54'+user.phone
   })
  .then(message => console.log(message.sid));
  },


async nodemailer(user,from='', subject='', html=`` ) {
	transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SENDGRID_EMAIL_FROM, // generated ethereal user
      pass: process.env.GMAIL_API_KRY, // generated ethereal password 'wekuzolhxauwsagy'
    },
  })
  let info = await transporter.sendMail({
    from: from, // sender address
    to: user.email, // list of receivers
    subject: subject, // Subject line
    text:`Bienvenido a bordo de MercadoNero Store`, // plain text body
    html:html, // html body
  });

  console.log("Message sent: %s", info.messageId);
},

async nodemailerResetPassword(store, password) {
	transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SENDGRID_EMAIL_FROM, // generated ethereal user
      pass: process.env.GMAIL_API_KRY, // generated ethereal password 'wekuzolhxauwsagy'
    },
  })
  let info = await transporter.sendMail({
    from: '"Departamento Notifications" <email@.com>', // sender address
    to: store.email, // list of receivers
    subject: "Reset Password store✔", // Subject line
    text:`MercadoNero Store`, // plain text body
    html:`<b>Password Reset ${store.name} la nueva clave es:  key : ${password}</b>
    <br> ya puedes utilizar la plataforma dando click al link
    <br>          
	  <a href='http://localhost:4200/security/login'>Entrar</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
}

module.exports = notifications;