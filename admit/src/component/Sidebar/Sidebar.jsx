import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <Link to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="Add" />
          <p>Add Item</p>
        </Link>

        <Link to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="Add" />
          <p>List Iteam</p>
        </Link>

        <Link to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="Add" />
          <p>Order</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar