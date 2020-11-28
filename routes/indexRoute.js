const express = require('express');
const nodemailer = require('nodemailer');
const {google} = require('googleapis')
const feedback = require('../modles/feedback');
const indexRoute = express.Router();

const CLIENT_ID='836515059620-e8mgv5flipan48tco2u1q2ruamhuuv9s.apps.googleusercontent.com';
const CLIENT_SECRET='AMSboUAwW8vRD7Z9D9Q8jugt';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04iEaw-1-p7GwCgYIARAAGAQSNwF-L9IrNtEOQTyih2HkjpsSzX1TzWR0h1_ntRZVbVEZJZiAaKMSLf_551fVCd9d-wXtgv5_MbU';


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

indexRoute.get('',(req,res)=>{
    res.render('index',{page_name:'home'});
});

indexRoute.post('',(req,res)=>{
    const output = `<b>${req.body.name}</b> thankyou for submiting your valuable feedback.You have taken
    a greate initiative towards awaring the spread of covid-19  We appreciate your efforts your feedback pumps us to make app like this.😊😇
    <br><br><br> Please do not reply to this mail`;
    const accessToken = oAuth2Client.getAccessToken();

    let newFeedback = new feedback(req.body);
    newFeedback.save()
    .then(()=>{
             let testAccount =  nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type:'OAuth2',
      user:'jaydeepshelake2001@gmail.com' ,
      clientId:CLIENT_ID,
      clientSecret:CLIENT_SECRET,
      refreshToken:REFRESH_TOKEN,
      accessToken:accessToken
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

// refresh token:1//04iEaw-1-p7GwCgYIARAAGAQSNwF-L9IrNtEOQTyih2HkjpsSzX1TzWR0h1_ntRZVbVEZJZiAaKMSLf_551fVCd9d-wXtgv5_MbU
// acess token:ya29.a0AfH6SMCQNJq7mHJDFsbdM5emEfLg5jFUZiae0x1yXnJcRx5g9XvpNNGrLIgbKMjBE4LIMkGnKbnMJnn_ukicdbzw1Qp2CX3oPUqAndkCxWieF59hsPGQIevQSuHd3V6la5IfYUJtLOfGt8Ic671lkEibtpNmxsw3aNlV804b3N4