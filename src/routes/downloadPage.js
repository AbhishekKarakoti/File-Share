const Express=require('express');
const File=require(`${__dirname}/../models/structure.js`);

const Router=Express.Router();

Router.get('/:uuid',async(req,res)=>{
    try{
        const response= await File.findOne({uuid:req.params.uuid});
        if(!response){
            return res.render('error.hbs');
        }
    
        const obj={
            filename:response.filename,
            path:response.path,
            size:response.size/1000000,
            downloadLink:`${process.env.APP_BASE_URL}/files/download/${response.uuid}`,
            requestedAt:new Date().toISOString()
        }
        res.render('download.hbs',obj)
    }catch(err){
        console.log(err);
        return res.render('error.hbs');
    }
})

module.exports=Router


