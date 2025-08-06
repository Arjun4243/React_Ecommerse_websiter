import React from 'react'
import "./payment.css"

const Payment = ({ transactionId = "987654321012", total = 123.45 }) => {
  return (
<div className="receipt-container">
      <h2>PAYMENT RECEIVED</h2>
      <div className="receipt-details">
        <p><strong>Transaction:</strong> {transactionId}</p>
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>
      <div className="qr-code">
        {/* Fake QR code using a placeholder image or CSS grid */}
        <img src="https://api.qrserver.com/v1/create-qr-code/?data=FAKE_PAYMENT&size=150x150" alt="Fake QR Code" />
      </div>
      <p className="thank-you">THANK YOU!</p>
    </div>


  )}


export default Payment;