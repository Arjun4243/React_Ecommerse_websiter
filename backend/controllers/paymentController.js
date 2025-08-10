import userModel from "../models/useModel.js";
import orderModel from "../models/orderModel.js";
import {nanoid} from "nanoid"


const payment_receive_data= async(req,res)=>{

    
    res.json({success:true,message:"received data"})
}

const payment_send_data = async (req, res) => {


    const transection_Id=nanoid(11)

    const frontend_url="http://localhost:5173"
        
    try{
        
        const newOrder=new orderModel({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            transectionId:transection_Id
        });

        await newOrder.save()

        await userModel.findByIdAndUpdate(req.userId,{cartData:{}})

      res.json({ success: true, message: "Ordered", transectionId: transection_Id,totalAmount:req.body.amount });

    }

    catch(error){console.log("order data can't be fatched",error)

        res.json({success:false,message:"order data can't be fatcthed"})
    }



    console.log("Received body:", req.body);
  console.log("userToken",req.userId)
  
}

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
    console.log(orders);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Order data Can't be fatched" });
  }
};


//listing order for admitn 

const listOrders=async(req,res)=>{
try{
  const orders=await orderModel.find({});
  res.json({success:true,data:orders})
}
catch(error){
  console.log(error)
  res.json({success:false, message:"somthing error to fatch the data"})
}
}

//api update order status

const updateStatus = async(req,res)=>{

  try{
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });


    res.json({success:true, message:"Status Updata"})


  }
  catch(error){
    console.log(error)
    res.json({success:false,message:"Error"})
  }

}



export {payment_receive_data,payment_send_data,userOrders,listOrders,updateStatus}