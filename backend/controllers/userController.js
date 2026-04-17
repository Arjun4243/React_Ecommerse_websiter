import userModel from "../models/useModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();
//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Email and password are required",
        });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                notification:{
                    text: "Login failed",
                    icon: "✗",
                    message: "Please Enter correct Email and password",
                }
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = createToken(user._id);
        return res.json({
            success: true,
            notification: {
                text: "Login successful",
                icon: "✓",
                message: "You have been logged in successfully.",
            },
            token,
        });
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "Error",
        });
    }
};


//jwt secret key 

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET )
}

//register user

const registerUser = async (req, res) => {
  const {name, email, password} = req.body;

  //checking user is alredy is exsists
  try {
    const exsist = await userModel.findOne({ email });

    if (exsist) {
      return res.json({
        success: false,
        message: "User alredy exists",
        notification:{
            text:"User already exists",
            icon:"✗",
            message:"Please try other email this id has been taken"
        }
      });
    }

    //validating email

    if(!validator.isEmail(email)){
        return res.json({
            success: false,
            message: "please enter a valid email",
        })
    }

    if(password.length<8){
        return res.json({
            success:false
            ,message:"password must be strong "})
    }
    //hashing password
    const salt= await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(password,salt);

    //we can write this line as 
    // hashpassword=await bcrypt.hash(password,await bcrypt.genSalt(10));

    const newUser= new userModel({
        name:name,
        email:email,
        password:hashpassword,
    })

    const user=await newUser.save();

    const token=createToken(user._id);
    res.json({
        success:true,
        token
    })

  } catch (err) {
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { loginUser, registerUser };
