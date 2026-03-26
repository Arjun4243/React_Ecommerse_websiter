import React from 'react';
import "./Gnotification.css"

const Gnotification=()=>{
    return(
       <div className="container">
         <div className="title">Login Successful</div>
        <div className="icon">✓</div>   
           
            <div className="message">You have been logged in successfully.</div>
       </div>
    )
}

export default Gnotification;