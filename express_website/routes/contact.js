var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contacto' });
});

router.post('/send', function(req, res, next){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fernandocorreia316@gmail.com',
      pass: 'nando1988'
    }
  })

  var mailOptions = {
    from: 'Fernando Correia <fernandocorreia316@gmail.com>',
    to: 'fernandocorreia316@gmail.com',
    subject: 'website submission',
    text: 'Voce tem um novo email... Nome: ' + req.body.name 
    + 'Email: ' + req.body.email
    + 'Message: ' + req.body.message,
    html: '<p>Tem uma mensagem nova com os seguintes detalhes</p><ul><li>Name: '
    +req.body.name+
    '</li><li>Email: '+req.body.email+
    '</li><li>Message: '+req.body.message+'</li></ul>'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      console.log(error);
      res.redirect('/');
    }
    else{
      console.log('Message Sent' + info.response);
    }
  });

});

module.exports = router;