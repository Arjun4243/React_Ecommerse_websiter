import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routers/foodRoute.js"
import userRouter from "./routers/userRouter.js"
import dotenv from "dotenv";
import cartRouter from './routers/cartRouter.js';
import orderRouter from "./routers/orderRouter.js"
import paymentRouter from "./routers/paymentRouter.js"
dotenv.config();
//app config

const app=express()

const port=process.env.PORT||4000

//middleware

app.use(express.json())
app.use(cors({
  origin: ["https://react-ecommerse-websiter-frontend.onrender.com", "http://172.16.2.39:5173", "http://localhost:5173"]
}));


//database connection 
connectDB();


//api endpoints

app.use("/api/food",foodRouter)
app.use("/images", express.static("uploads"));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/payment",paymentRouter)


app.listen(port,()=>{
    console.log(`you server is runing on ${port}`)
})

//mongodb+srv://Arjun:<db_password>@e.gsjzwxo.mongodb.net/?retryWrites=true&w=majority&appName=e