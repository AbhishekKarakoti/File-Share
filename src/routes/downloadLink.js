const Express=require('express');
const Router=Express.Router();
const path=require('path');
const File=require(`${__dirname}/../models/structure.js`);

Router.get('/:uuid',async(req,res)=>{
   
    try{
        const file= await File.findOne({uuid:req.params.uuid});
        // console.log(file);
        if(!file){
          return res.render('error.hbs');
        }
        const filePath=file.path
        // console.log(filePath);
        res.download(filePath);
        
    }catch(err){
        console.log(err);
        return res.render('error.hbs');
    }

})





module.exports=Router;