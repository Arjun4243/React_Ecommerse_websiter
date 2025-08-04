import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routers/foodRoute.js"
import userRouter from "./routers/userRouter.js"
import dotenv from "dotenv";
import cartRouter from './routers/cartRouter.js';
import orderRouter from "./routers/orderRouter.js"
dotenv.config();
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
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`you server is runing on ${port}`)
})

//mongodb+srv://Arjun:<db_password>@e.gsjzwxo.mongodb.net/?retryWrites=true&w=majority&appName=e