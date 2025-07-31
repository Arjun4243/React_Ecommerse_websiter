import React from 'react'
import Navbar from './component/navebar/Navbar.jsx'
import Sidebar from './component/sidebar/Sidebar.jsx'
import {Routes,Route} from "react-router-dom"
import Add from './pages/Add/Add.jsx'
import Order from './pages/Order/Order.jsx'
import List from './pages/List/List.jsx'
  import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>

          <Route path="/orders" element={<Order url={url}/>}/>

          <Route path="/list" element={<List url={url}/>}/>

        </Routes>
      </div>
    </div>
  )
}

export default App