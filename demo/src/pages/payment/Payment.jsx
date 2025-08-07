import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./payment.css";
import { StoreContext } from '../../context/StoreContext';
import {useNavigate} from "react-router-dom"

const Payment = () => {
  const [payment_Status, setPayment_Status] = useState("Please Pay");
  const { transection_id, paymentTotalAmount } = useContext(StoreContext);

  const navigate =useNavigate()
  
  const handler = ()=>{
    setPayment_Status("Thank you for paying")

    setTimeout(()=>{
      navigate("/")
      window.location.reload()
    },2000)
  }



  return (
    <div className="receipt-container" onClick={handler}>
      <h2>Scan QR Code</h2>
      <div className="receipt-details">
        <p><strong>Transaction ID:</strong> {transection_id}</p>
        <p><strong>Total:</strong> ${paymentTotalAmount}</p>
      </div>
      <div className="qr-code">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:5173/payment?status=paid&txn=${transection_id}&amount=${paymentTotalAmount}&size=150x150`}
          alt="QR Code"
        />
      </div>
      <p className="thank-you">{payment_Status}</p>
    </div>
  );
};

export default Payment;
