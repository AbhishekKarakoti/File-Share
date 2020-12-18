const e = require('express');
const mongoose=require('mongoose');
require('dotenv').config();
let url=process.env.URL;
url=url.replace('<PASSWORD>',process.env.PASSWORD);


mongoose.connect(url,{
   useCreateIndex:true,
   useNewUrlParser:true,
   useFindAndModify:true,
   useUnifiedTopology:true    
}).then(()=>{
  console.log('db connected');
}).catch((err)=>{
  console.log(err);
})