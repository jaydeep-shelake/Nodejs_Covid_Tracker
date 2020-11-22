const express = require('express');
const nodemailer = require('nodemailer');
const feedback = require('../modles/feedback');
const indexRoute = express.Router();

indexRoute.get('',(req,res)=>{
    res.render('index',{page_name:'home'});
});

indexRoute.post('',(req,res)=>{
    const output = `<b>${req.body.name}</b> thankyou for submiting your valueable feedback.You have taken
    a greate initiative towards awaring the spread of covid-19 <br> We appreciate your efforts your feedback pumps us to make app like this.😊😇
    <br><br><br> Please do not reply to this mail`;
    let newFeedback = new feedback(req.body);
    newFeedback.save()
    .then(()=>{
             let testAccount =  nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'jaydeepshelake2001@gmail.com', // generated ethereal user
      pass: '26dec@2000', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info =  transporter.sendMail({
    from: 'jaydeepshelake2001@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: "Greeting from D3 batch RIT ✔", // Subject line
    html: `${output}`, // html body
  });

  
  
  res.render('index',{page_name:'home'});
    })
    .catch(err=>console.log(err));

    //node mailer
    
});

indexRoute.get('/about',(req,res)=>{
 res.render('about',{page_name:'about'});
});

indexRoute.get('/tracker',(req,res)=>{
 res.render('tracker',{page_name:'tracker'})
});

indexRoute.get('/comments', async(req,res)=>{
  const feedbackComment=  await feedback.find({})
  res.render('comments',{feedbackComment:feedbackComment,page_name:'comments'});  
});


module.exports=indexRoute;