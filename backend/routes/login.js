const express = require("express");
const router = express.Router()
const bodyParse = require("body-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const User = require("../schemas/user.js")
const secret = "DNL@3"
router.post("/login",async(req,res)=>{
    console.log("ok")
    const {email,password}={...req.body}
    console.log(email,password)

    //checking the missing fields
    if(email==="" || password===""){
        res.status(400).json({message:"please enter all the fields"})
    }
    //validating the password
    if(password.length<6||password.length>12){
        res.status(400).json({
            message:"password length should be greater than 6 and lessthan 12"
        })
    }
    //validating the email
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        res.status(400).json({
            message:"please enter a valid email"
        })
    }
    
    const UserExists =await User.findOne({email});
    
    //checking for not existing user
    if(!UserExists){
        console.log("not found")
        return res.status(400).json({
            message:"Invalid User"
        })
    }
    //hashing the password

    else{try{
        const checkpassword = await bcrypt.compare(password,UserExists.password)
        if(!checkpassword){
            return res.status(401).json({
                message:"please enter valid password"
            })
        }
        const payload = {_id:UserExists._id}
        const token = jwt.sign(payload,secret)
        //   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        console.log(token)
        
        const cookieOptions = {
            // expires: new Date(
            //   Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            // ),
            httpOnly: true
          };
          res.cookie('jwt', token,cookieOptions);
        return res.status(200).json({
            token:token,
            
        })
        
    }
    catch(err){
        console.log(err.message)
    }
    
    // console.log("ok");
}
})

module.exports=router



