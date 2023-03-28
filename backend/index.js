const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./mongoConnection/connection.js")
const addContact=require('./routes/addContacts')
const deleteContact=require('./routes/deletecontact')
const cookieParser = require('cookie-parser')
const login = require("./routes/login.js")
const register = require("./routes/signup.js")
const auth = require("./authentication/authenticate.js")
const logout = require("./routes/logout.js")
const contactsRoute= require("./routes/contacts") //include contact from routes folder
const searchRoute = require("./routes/search") //include search from routes folder 

connection()
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/api/v1/",login)
app.use("/api/v1/",register)
app.get("/api/v1/contacts",auth,(req,res)=>{
    return res.status(200).json({
        user:req.user
    })
})
app.use("/api/v1",logout)
app.use(deleteContact)
app.use(addContact)
app.use('/listcontacts',contactsRoute) 
app.use('/listcontacts/:userId',searchRoute) 

app.listen(5000,()=>{console.log("server is up at 5000")})
