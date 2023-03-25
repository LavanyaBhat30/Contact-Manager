const express = require("express");
const cors = require("cors");
const User = require("./schemas/data.js")
const connection = require("./mongoConnection/connection.js")
const addContact=require('./routes/addcontacts')
const deleteContact=require('./routes/deletecontact')
const contact=require("./schemas/data")


const app = express();
connection()

app.use(deleteContact)


app.use(addContact)
app.listen(5000,()=>{console.log("server is up at 5000")})




