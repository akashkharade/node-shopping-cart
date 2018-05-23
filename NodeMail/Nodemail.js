var nodemailer = require('nodemailer');
var starttls=require('starttls');

var transporter = nodemailer.createTransport({
  host: '172.21.74.17',
  port: '25',
  secure: false,
  debug:true,
  auth: {
    user: 'no-reply@smtp.pidc.com',
    pass: 'India1234',
  },
  tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
  from: 'no-reply@smtp.pidc.com',
  to: 'no-reply@smtp.pidc.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
