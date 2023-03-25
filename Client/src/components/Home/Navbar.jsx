import React, { useState } from 'react'
import { MdAdd, MdClose, MdHome, MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './Home.css'
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login')
}
  const handleDeleteAll = () => {
    fetch("https://note-app-dnd7.onrender.com/deleteall", {
      method: 'delete',
      headers: {
        'Authorization': "Bearer " + localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error.message)
        }
        else {
          alert("All notes deleted successfully")
        }
      }).catch(e => console.log(e))
  }
  return (
    <div className='nav'>
      <div className="navbar" onClick={() => { navigate('/note') }}>
        <span><MdHome /></span>
        Home
      </div>
      <div className="navbar" onClick={() => { navigate('/addnote') }}>
        <span><MdAdd /></span>
        AddNote
      </div>
      <div className="navbar" onClick={() => { handleDeleteAll() }}>
        <span><MdClose /></span>
        DeleteAll
      </div>
      <div className="navbar">
        <span><MdLogout /></span>
        Export
      </div>
      <div className="navbar">
      <div className='logout-btn ' onClick={() => { handleLogout() }}>Logout
      </div>    
      </div>
      
    </div>
  )
}
