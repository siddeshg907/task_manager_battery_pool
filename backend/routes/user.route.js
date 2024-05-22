const express=require("express")
const bcrypt=require("bcrypt")
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const { auth } = require("../middleware/auth.middleware")

const userRouter=express.Router()

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const isUser = await UserModel.findOne({ email });
        if (isUser) {
            return res.status(400).send({ error: "User already exists" });
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" });
            }
            if (!hash) {
                return res.status(400).send({ error: "Internal server error" });
            }
            const user = new UserModel({ name, email, password: hash });
            await user.save();
            return res.status(200).json({ msg: "New user registered successfully" });
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email})
    try {
        bcrypt.compare(password,user.password,async(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id,name:user.name},"green",{expiresIn:"7d"})
                res.status(200).json({msg:"Login Successfull",token,userID:user._id})
            }else{
                res.status(200).json({msg:"Wrong Credentials"})
            }
        })
    } catch (err) {
        res.status(400).json({error:err})
    }
})

userRouter.get("/",async(req,res)=>{
    const userID = req.headers.userID
    try {
        const users = await UserModel.find(userID);
        res.status(200).send(users);
      } catch (error) {
        res.status(400).json({ "error": error.message });
      }
})


module.exports={
    userRouter
}