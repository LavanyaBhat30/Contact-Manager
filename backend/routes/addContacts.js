const express=require("express")
const contact=require("../schemas/data")
const multer=require('multer')
const csv = require('csvtojson');
const path= require("path")
const router= express.Router()
router.use(express.json())


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '/uploads/'));
        
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

  router.post('/addcontact', upload.single('file'), (req, res) => {
    const userID = req.body.userId
    if (!req.file) return res.send('Please upload a file')
    //console.log(req.file)
    csv()
      .fromFile(req.file.path)
      .then(jsonData => {
        const dataWithUserId = jsonData.map(data => ({...data, userID}));
        //console.log(dataWithUserId)
        contact.insertMany(dataWithUserId)
        .then(function(){
            res.status(200).json({data:documents});
      })
        .catch(function(error){
            res.status(500).send(error);
          
        }) 
        });
      });
  

module.exports= router