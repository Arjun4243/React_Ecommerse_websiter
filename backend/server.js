import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routers/foodRoute.js"

//app config

const app=express()

const port=4000

//middleware

app.use(express.json())
app.use(cors())

//database connection 
connectDB();


//api endpoints

app.use("/api/food",foodRouter)
app.use("/images", express.static("uploads"));

app.get("/",(req,res)=>{
    res.send("API wroking")
})

app.listen(port,()=>{
    console.log(`you server is runing on ${port}`)
})

//mongodb+srv://Arjun:<db_password>@e.gsjzwxo.mongodb.net/?retryWrites=true&w=majority&appName=e