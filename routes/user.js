const router = require("express").Router();
const User = require("../models/user"); 
const bcrypt = require("bcryptjs");

// SIGN IN 

router.post("/register", async(req , res) => {
    try {
        const { email , username , password} = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = new User({email , username, password : hashedPassword})
        await user.save()
        .then(() => {
            res.status(200).json({user : user})
            console.log(user)
        })
    } catch (error) {
        res.status(400).json({message : error.message})
        console.log(error.message)
    }
} )

//SignIn 

router.post("/login" , async(req , res) => {
    try {
        const user = await User.findOne({email : req.body.email});

        if (!user){
            res.status(400).json({message : "Email Id Doe snot exist"});
        }

        const comparePassword = bcrypt.compareSync(req.body.password , user.password)
        if (!comparePassword){
            res.status(400).json({message : "Invalid Password"});
        }

        const {password , ...others} = user._doc 
        res.status(200).json({others});
        console.log(others)


    } catch (error) {
        res.status(400).json({message : error.message});
        console.log(error.message);
    }
})

module.exports = router;