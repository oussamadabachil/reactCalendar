var express = require('express');
var router = express.Router();

const Booking = require("../models/booking")

//SHOW ALL BOOKINGS

router.get('/all',(req,res)=>{
    Booking.find().then(data=>{
        res.json(data)
    })
}
)
//SHOW BOOKING BY ID
router.get('/booking/:id',(req,res)=>{
    Booking.findById(req.params.id,(err,booking)=>{
        if(err){  
            res.status(500).json({message:{msgBody:"Error has occured",msgError:true}})
        }
        res.status(200).json({booking})
    }
    )
}
)




//delete first row of booking per day
//MINUS ONE SEAT

//check if there are more than 1 seat
router.get('/check/:id',(req,res)=>{
    Booking.findById(req.params.id,(err,booking)=>{
        if(booking.NbreDePlace>0){
            res.json({
                result:true,
                message : "Il y'a plus d'une place",
                NbreDePlace : booking.NbreDePlace
            })
        }
        else{
            res.json({
                message:"Il n'y a plus de places",
                result:false,
            })
        }
    }
    )
}
)
    

router.put('/minus/:id',(req,res)=>{


    Booking.findOneAndUpdate({_id:req.params.id},{$inc:{NbreDePlace:-1}},(err,booking)=>{
       
        if(err){
            res.status(500).json({message:{msgBody:"Error has occured",msgError:true}})
        }
        res.status(200).json({message:{msgBody:"Booking updated",msgError:false}})
    }
    )
}
)    


//adding user to booking
router.put('/adduser/:id',(req,res)=>{
    Booking.findOneAndUpdate({_id:req.params.id},{$push:{user:req.body.user}},(err,booking)=>{
        if(err){  
            res.status(500).json({message:{msgBody:"Error has occured",msgError:true}})
        }
        res.status(200).json({message:{msgBody:"Booking updated",msgError:false}})
    }
    )
}
)

module.exports = router;

