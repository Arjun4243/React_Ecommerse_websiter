import React, { useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";

const LoginPopUp = ({ setShowLogin }) => {
    const [currState, setCurrStates] = useState("Sigh up");

    return (
        <div className="login-popup">
            <form action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt=""
                    />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Login" ? (
                        <></>
                    ) : (
                        <input type="text" placeholder="You name" required></input>
                    )}

                    <input type="email" placeholder="you email" required />
                    <input type="password" placeholder="password" required />
                </div>
                <button>{currState === "Sign up" ? "Create account" : "Login"}</button>
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
