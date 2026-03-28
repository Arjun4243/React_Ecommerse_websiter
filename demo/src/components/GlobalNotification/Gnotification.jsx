import React from 'react';
import "./Gnotification.css"
import {useContext} from "react";
import { StoreContext } from '../../context/StoreContext';

const Gnotification=()=>{

    const {text}=useContext(StoreContext)
    return(
       <div className="container">
         <div className="title">{text.text}</div>
         <div className="content">
           <span className="icon">{text.icon}</span>
         </div>
          <div className="message">{text.message}</div>
       </div>
    )
}

export default Gnotification;