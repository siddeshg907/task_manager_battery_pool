const express=require("express")
const { TaskModel } = require("../model/task.model")
const { UserModel } = require("../model/user.model")
const { auth } = require("../middleware/auth.middleware")



const taskRouter=express.Router()
taskRouter.use(auth)

taskRouter.post("/add",auth,async(req,res)=>{
    const payload=req.body
    try {
        const newTask=new TaskModel(payload)
        const user=await UserModel.findOne({"_id":req.body.userID})
        const count=Number(user.tasks)+1
        await UserModel.findByIdAndUpdate({_id:req.body.userID},{tasks:count})
        const task=await newTask.save()
        res.status(200).json({"msg":"A new Task added"})
    } catch (error) {
        res.status(400).json({msg:"server error"})
    }
})

taskRouter.get("/", auth, async (req, res) => {
    const userID = req.headers.userID; // Access userID from request headers
    
    try {
        
      const tasks = await TaskModel.find(userID);
      res.status(200).send(tasks);
    } catch (error) {
      res.status(400).json({ "error": error.message });
    }
  });

taskRouter.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
        const task=await TaskModel.findOne({_id:id})
        if(task.userID==req.body.userID){
            await TaskModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"task updated"})
        }else{
            res.status(403).json({msg:"You are not auth"})
        }
    } catch (error) {
        res.status(500).json({"error":error.message})
    }
})

taskRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
        const task=await TaskModel.findOne({_id:id})
        if(task.userID==req.body.userID){
            await TaskModel.findByIdAndDelete({_id:id})
            res.status(200).json({"msg":"task Deleted"})
        }else{
            res.status(403).json({msg:"You are not auth"})
        }
    } catch (error) {
        res.status(500).json({"error":error.message+" "+"task not found"})
    }
})

module.exports={
    taskRouter
}