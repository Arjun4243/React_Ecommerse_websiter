import orderModel from "../models/orderModel.js"
import userModel from "../models/useModel.js"



//placing user order for frontend

const placeOrder=async(req,res)=>{

    try{
        const newOrder =new orderModel({
            userId:req.body.userId,
            item:req.body.item,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save()

        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
    }
    catch(error){

    }
}

export {placeOrder};