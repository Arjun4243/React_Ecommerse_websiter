import React, { use, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
const LoginPopUp = ({ setShowLogin }) => {

    const { url, setToken, setGlobalNotification, setText } = useContext(StoreContext);
    const [currState, setCurrStates] = useState("Sign up");

    //login data taking and send to backend
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }));

      


    }

    // const run = (state) => {
    //     if (state === "Sign up") {
    //           setGlobalNotification(true)
    //     setText({
    //         text: "Registration successful",
    //         icon: "✓",
    //         message: "You have been registered successfully."
    //     })

    //     setTimeout(() => {
    //         setGlobalNotification(false)
    //     }, 5000)
    //     }
    // }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"

        }

        const response = await fetch(newUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (response.ok && result.success) {
            setToken(result.token)
            localStorage.setItem("token", result.token)
            setShowLogin(false)

            setText({
                text: result.notification.text,
                icon: result.notification.icon,
                message: result.notification.message,
            })



            setGlobalNotification(true)
            setTimeout(() => setGlobalNotification(false), 5000)
        }
        else {
            setText({
                text: result.notification.text,
                icon: result.notification.icon,
                message: result.notification.message
            })

            setGlobalNotification(true)
            setTimeout(() => {
                setGlobalNotification(false)
            }, 5000)

        }
    }

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} action="" className="login-popup-container">
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
                        Create new account?<span onClick={() => { setCurrStates("Sign Up") }}>click me</span>
                    </p>
                ) : (
                    <p>
                        Already have an accound?<span onClick={() => { setCurrStates("Login") }}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopUp;
