import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import "./App.css"
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart"
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import Footer from './components/footer/Footer';
import LoginPopUp from './components/LoginPopup/LoginPopUp';

const App = () => {

  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App;