import React, { use, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import axios from "axios";
const LoginPopUp = ({ setShowLogin }) => {

    const {url,setToken}=useContext(StoreContext);
    const [currState, setCurrStates] = useState("Sign up");
    
    //login data taking and send to backend
    const [data,setData]=useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;

        setData(data=>({...data, [name]: value}));
    }

    const onLogin=async(even)=>{
        event.preventDefault();
        let newUrl=url;
        if(currState==="Login"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"

        }

        const response = await axios.post(newUrl,data)

        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
            alert("you are successfully logged in");
        }
        else{
            alert(response.data.message);
            console.error(response.data.message);
        }
    }

    return (
        <div className="login-popup">
            <form onSubmit={onLogin}action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt=""
                    />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Login" ? 
                        <></>
                     : (
                        <input type="text" name="name" onChange={onChangeHandler} placeholder="You name" required></input>
                    )}

                    <input type="email" name="email" onChange={onChangeHandler} placeholder="you email" required />
                    <input type="password" name="password" onChange={onChangeHandler} placeholder="password" required />
                </div>
                <button type="submit">{currState === "Sign up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the tearm of use & privacy policy.</p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Create new account?<span onClick={()=>{setCurrStates("Sign Up")}}>click me</span>
                    </p>
                ) : (
                    <p>
                        Already have an accound?<span onClick={()=>{setCurrStates("Login")}}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopUp;
