const express = require("express");
const User = require("../models/user"); // fullname,email,mobile,password
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'pankaj@$heer'

//   User SINGUP by POST request "/api/user/creat"  //

router.post(
  "/creat",
  [
    body("email", "Please Enter valid e-mail address").isEmail(),
    body("mobile", "Please Enter valid Mobile 10 character Number").isLength({min: 10,max: 10}),
    body("fullname", "Please Enter Fullname").notEmpty(),
    body("password", "Password Type Minimum 5 Charactor").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      const emailFind = await User.findOne({ email: req.body.email });
      const mobileFind = await User.findOne({ mobile: req.body.mobile });
      if (!result.isEmpty()) {
        res.status(400).send({ errors: result.array() });

        // Email Chack in DataBase //
      } else if (emailFind) {
        res.status(400).send("Email Already Exist");

        // Mobile Chack in DataBase //
      } else if (mobileFind) {
        res.status(400).send("mobile Already Exist");
      }else{
        const salt = await bcrypt.genSalt(10)
        const secretPass = await bcrypt.hash(req.body.password,salt) 
        // User Save in DataBase
        user = await User.create({
          fullname: req.body.fullname,
          email: req.body.email,
          password:secretPass,
          mobile: req.body.mobile,
          term_condition: req.body.term_condition
        })
        const data ={
          user:{
            id:user.id
          }
        }
        const token = jwt.sign(data,JWT_SECRET);
        res.send(token);
      }
    } catch (error) {
      res.status(500).send("Server Not Found");
    }
  }
);

//  GET all User Request "/api/user/all"

router.get("/all", async (req, res) => {
  const data = await User.find();
  try {
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// FIND user "api/user/find"
router.post(
  "/find",
  [
    body("email").isEmail(),
    body("mobile").isLength({ min: 10, max: 10 }),
    body("fullname").notEmpty(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      const emailFind = await User.findOne({ email: req.body.email });
      const mobileFind = await User.findOne({ mobile: req.body.mobile });
      const fullname = req.body.fullname;
      const email = req.body.email;
      const mobile = req.body.mobile;
      const password = req.body.password;
      const term_condition = req.body.term_condition;
      if (!result.isEmpty()) {
        res.status(400).send({ errors: result.array() });
      } else if (!(fullname && email && mobile && password)) {
        res.status(403).send("Please Fill All Details");
      } else if (!term_condition) {
        res.status(403).send("Please Accept Term&Condition");
      } else if (emailFind) {
        res.status(403).send("Email Already Exist");
      } else if (mobileFind) {
        res.status(403).send("Mobile Number Already Exist");
      } else {
        res.status(200).send("Find Passed");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// SINGIN user request "api/user/singin"

router.post(
  "/singin",
  [
    body("mobile").isLength({ min: 10, max: 10 }),
    body("password").isLength({ min: 5 })
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        res.status(400).send("Invalid Password");
      }
    
      const mobileFind = await User.findOne({mobile: req.body.mobile});
      if (!mobileFind) {
       return res.status(400).send("Invalid Password");
      }

      const passCompair = await bcrypt.compare(req.body.password,mobileFind.password)
      if(!passCompair){
       return res.status(400).send("Invalid Password");
      }

        const data = {
          mobileFind:{
            id:mobileFind.id
          }
        }
        const token = jwt.sign(data,JWT_SECRET)
       return res.json(token)
      
    } catch (error) {
     return res.status(500).send(error);
    }
  }
);

// GET user data request 'api/user/getuser'

router.post('/getuser',fetchuser,async(req,res)=>{
  try {
   const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.json(user)
  } catch (error) {
    
    res.status(500).send('server error')
  }
})

// ONE User Data post api 'api/user/:id' //

router.post('/:id',async(req,res)=>{
  try{
    const user = await User.findById(req.params.id)
    res.send(user)
  }
  catch(error){
    res.status(500).send(error)
  }
})

// FORGOT PASSWORD user request "api/user/forgotpassword"

router.post("/forgotpassword",[body('mobile').isLength({min:10,max:10})], async (req, res) => {
  try {
    const result = validationResult(req);
    const user = await User.findOne({ mobile: req.body.mobile });

    if (!result.isEmpty()) {
      res.status(403).json("Please Enter Valid Number");
    } else if(user) {
      res.status(200).send(user)
    }else{
      res.status(404).send("User Not Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// SETPASSWORD PUT api user request "api/user/setpassword/:id"

router.put(
  "/setpassword/:id",
  [body("password").isLength({ min: 5 })],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        res.status(403).send("Please Enter Password Minimum 5 Charactor");
      } else {
        await User.findByIdAndUpdate(req.params.id, {
          password: req.body.password,
        });
        res.status(200).send("Password Update Successfull");
      }
    } catch (errors) {
      res.status(500).send(errors);
    }
  }
);

// DELET user request "api/user/delete/:id"

router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log("deleted");
    res.json({ message: "User Deleted" });
  } catch (err) {
    return res.status(500).send({ message: "Error" });
  }
});

module.exports = router;
