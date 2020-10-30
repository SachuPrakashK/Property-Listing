const express=require('express');
const router=express.Router();
const listingmodel=require("../models/listingmodel");
const verify=require('./verifytoken');


router.get('/listings',function(req,res){
    listingmodel.find({}).exec(function(err,listings){
        if(err){
            console.log("Error");
        }else{
            res.json(listings);
        }

    });
})

router.post('/listing',verify,function(req,res){
    const listing=new listingmodel({
        title:req.body.title,
        price:req.body.price,
        locality:req.body.locality,
        details:req.body.details
    })
    listing.save(function(err,insertedListing){
        if(err){
            console.log("Error");
            res.status(400).send(err);
        }else{
            res.json(insertedListing);
        }

    })
})

router.get('/listing/:id',function(req,res){
    listingmodel.findById(req.params.id).exec(function(err,getlisting){
        if(err){
            console.log("err")
        }else{
            res.json(getlisting)
        }
    })
})

router.put('/listing/:id',verify,function(req,res){
    listingmodel.findByIdAndUpdate(req.params.id,{
        $set:{ title:req.body.title,
        price:req.body.price,
        locality:req.body.locality,
        details:req.body.details
        }
    },
    {
        new:true
    },
    function(err,updatedlisting){
        if(err){
            res.send("Error updating listing");
        }else{
            res.json(updatedlisting);
        }
    }
    )
})

router.delete('/listing/:id',verify,function(req,res){
    listingmodel.findByIdAndRemove(req.params.id,function(err,deletedlisting){
        if(err){
            console.log("Error");
        }else{
            res.json(deletedlisting);
        }

    });
})

module.exports=router;