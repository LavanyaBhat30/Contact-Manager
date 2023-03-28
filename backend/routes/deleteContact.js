const express=require('express');
const contact=require("../schemas/data")


const router= express.Router()
router.use(express.json())

router.delete('/deletecontact/:userid', async (req, res) => {
    let userID = req.params.userid
    let ids = req.body.ids
    console.log(userID,ids)
    contact.deleteMany({_id: {$in: ids}, userID: userID}).then(function(){
        
        console.log("Data deleted"); 
        res.end("Data Deleted");// Success
    })
    .catch(function(error){
        console.log(error); // Failure
    });
})

module.exports= router