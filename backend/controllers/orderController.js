import orderModel from "../models/orderModel.js";
import userModel from "../models/useModel.js";

//placing user order for frontend

const placeOrder = async (req, res) => {

    const frontend_url= "http://localhost:5173"
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });
  } catch (error) {
    
    console.log("error to payment",error)
    res.json({success:false,message:"Error in payment"})

  }
};

export { placeOrder };
