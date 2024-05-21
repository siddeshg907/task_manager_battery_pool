const express=require("express")
const cors=require("cors")
const {connection}=require("./db")
const { userRouter } = require("./routes/user.route")
const { taskRouter } = require("./routes/task.route")


const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).json({msg:"This is Home Page"})
})

app.use("/users",userRouter)
app.use("/tasks",taskRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to Database")
        console.log("server is running on port 8080")
    } catch (error) {
        console.log(error)
    }
    
})