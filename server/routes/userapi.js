const express=require('express');
const router=express.Router();
const usermodel=require('../models/usermodel')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/register',function(req,res){
    
    usermodel.findOne({email: req.body.email}).then(user=>{

        if(user){
            return res.status(400).send("Email already exists!");
        }else{

            bcrypt.hash(req.body.password, 10).then((hash) => {
                const user=new usermodel({
                    name:req.body.name,
                    email:req.body.email,
                    password:hash
                });
            
            
                user.save(function(err,newuser){
                    if(err){
                        console.log("Error");
                        res.status(400).send(err);
                    }else{
                        res.json(newuser);
                    }
            
                });
            });
        }
    })
});

router.post('/login',function(req,res){
    usermodel.findOne({email:req.body.email}).then(user=>{
        if(!user) {
            return res.status(400).send("Wrong mail!")
        }else{
            bcrypt.compare(req.body.password, user.password).then(response=>{
                if(!response) {return res.status(400).send("Wrong password!")};
                //return res.send("user logged in");
                
                const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
                res.header("auth-token",token).send({token:token})
            });
        }

    })
})



module.exports=router;