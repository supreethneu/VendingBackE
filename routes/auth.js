const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  

  try {
    const savedUser = await newUser.save();    //wait async
    res.status(201).json(savedUser);            //response to client
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
    
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        try{
            const match = await bcrypt.compare(req.body.password, user.password);
            const jwtToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
            if(match){
                res.json({ jwtToken: jwtToken });
            } else {
                res.json({ message: "Invalid Credentials" });
            }
            } catch(e) {
            console.log(e)  
    
    } 
    

});

module.exports = router;
