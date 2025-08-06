import React from 'react'
import "./payment.css"

import { StoreContext } from '../../context/StoreContext'
import {useState,useContext} from "react"

const Payment = () => {

  const [payment_Status, setPayment_Status] = useState("Please Pay");
  const {transection_id,paymentTotalAmount}=useContext(StoreContext)

 return (
<div className="receipt-container">
      <h2>Scan QR Code</h2>
      <div className="receipt-details">
        <p><strong>Transaction ID:</strong> {transection_id}</p>
        <p><strong>Total:</strong> ${paymentTotalAmount}</p>
      </div>
      <div className="qr-code">
        {/* Fake QR code using a placeholder image or CSS grid */}
        <img src="https://api.qrserver.com/v1/create-qr-code/?data=FAKE_PAYMENT&size=150x150" alt="Fake QR Code" />
      </div>
      <p className="thank-you">{payment_Status}</p>
      
    </div>


  )}


export default Payment;