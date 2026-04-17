import React from 'react'
import "./List.css"
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
function List() {

  const [list,setList]=useState([])
  const url="http://localhost:4000";
  const fetchList= async()=>{
    try {
      const response = await fetch(`${url}/api/food/list`);
      const data = await response.json();
      if (response.ok && data.success) {
        console.log(data);
        setList(data.data);
      } else {
        toast.error(data.message || 'Error fetching food list');
      }
    } catch (error) {
      toast.error('Network error');
    }
  }


  const removeFood=async(foodId)=>{
    try {
      const response = await fetch(`${url}/api/food/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: foodId }),
      });
      const data = await response.json();
      await fetchList();
      if (response.ok && data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Error removing food');
      }
    } catch (error) {
      toast.error('Network error');
    }
  }
  useEffect(()=>{
    fetchList();
  }, []);
  
  return (
    <div className="list add flex-col">
      <p>All Food list</p>
      <div className="list-table">
        <div className="list-table-formate title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
          {list.map((item,index)=>{
           return (
           <div className='list-table-formate' key={index}>
            <img src={`${url}/images/`+item.image} alt="itam images" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
           </div>
          )
          })}
        </div>
      </div>
  
  )
}

export default List