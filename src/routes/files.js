const { response } = require('express');
const Express=require('express');
const Router=Express.Router();
const multer=require('multer');
const path=require('path');
const File= require(`${__dirname}/../models/structure.js`);
const {v4:uuid4}=require('uuid');

let storage=multer.diskStorage({
    
    destination:function(req,file,cb){
        cb(null,`${__dirname}/../../uploads/`)
    },
    
    filename:function(req,file,cb){
       const uniqueName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
       
       cb(null,uniqueName);
    }
})
let upload=multer({
    storage,
    limit:{
        fileSize:100
    }
}).single('myfile');

Router.post('/upload',(req,res)=>{
   
    //upload file
    upload(req,res,async(err)=>{
    
      

        //check for file on request object
        if(!req.file){
            return res.json({
                message:"no file attached"
            })
            
        }
        
        if(err){
            res.status(500).json({
                message:err.message
            })
            return;
        }
        
         try{
            const newFile= new File({
                filename:req.file.filename,
                path:req.file.path,
                size:req.file.size,
                uuid:uuid4()
   
            });
           
            const response=await newFile.save();
         
             
           res.status(201).json({
               file:`${process.env.APP_BASE_URL}files/${response.uuid}`
           })
         }catch(err){
             console.log(err);
             res.status(400).json({
                 message:"damn.. boi"
             })
         }
         
    })



})

module.exports=Router;