import express from "express"
import authMiddleware from "../middleware/auth.js";

import { payment_receive_data,payment_send_data } from "../controllers/paymentController.js"

const paymentRouter=express.Router()


paymentRouter.post("/send",authMiddleware,payment_send_data)
paymentRouter.get("/receive",authMiddleware,payment_receive_data)

export default paymentRouter;