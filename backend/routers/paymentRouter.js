import express from "express"
import authMiddleware from "../middleware/auth.js";


import { listOrders, payment_receive_data,updateStatus,payment_send_data,userOrders } from "../controllers/paymentController.js"

const paymentRouter=express.Router()


paymentRouter.post("/send",authMiddleware,payment_send_data)
paymentRouter.get("/receive",authMiddleware,payment_receive_data)
paymentRouter.post("/userOrders",authMiddleware,userOrders)
paymentRouter.get("/list",listOrders)
paymentRouter.post("/status",updateStatus)
export default paymentRouter;