if(process.env.NODE_EVN !=='production'){
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const expresLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT||3000;
const indexRoute=require('./routes/indexRoute');
const public = path.join(__dirname,'./public');
const views = path.join(__dirname,'./views');
const app=express();

const uri =process.env.DATABASE_URL;
const connect = mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('Connected...'))
.catch(err=>console.log(err));

app.set('view engine','ejs');
app.set('views',views);
app.set('layout','layout/layout');
app.use(expresLayouts);
app.use(express.static(public));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',indexRoute);



app.listen(port,()=>{
console.log(`server is runing on http://localhost:${port}`);
});
//mongodb+srv://Jaydeep-shelake:<Pass@123>@cluster0.dvyoz.mongodb.net/Project 1?retryWrites=true&w=majority