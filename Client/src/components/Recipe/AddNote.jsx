import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Home/Navbar';
import './Note.css'
export default function AddNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")  
 
  const handleAddNote = () => {  
    fetch('https://note-app-dnd7.onrender.com/addnote',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer "+ localStorage.getItem("token")
      },
      body: JSON.stringify({
        title : title,
        description : description          
      })
    }).then(res=> res.json())
    .then(data=>{
      console.log(data);
      if(data.error){
        alert(data.error)
        return
      }
      else{
        alert('note uploaded successfully');
        navigate('/note');
      }
    }).catch(e=>console.log(e))  
  }  

  return (
    <div className='add-container'>
       <div className='navb'>
                <Navbar />
            </div>
      <div className='add-main'>  
      <div className="noteinp">
            <label htmlFor="title">Title</label>
            <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value = {title} />
          </div>
          <div className="noteinp">
            <label htmlFor="description">Description</label>
            <textarea cols='50' rows="5" onChange={(e)=>{setDescription(e.target.value)}} value = {description} placeholder="what is on your mind ?" />
          </div>      
          <div className="mt-3">
            <button className='noteaddbtn' type='submit' onClick={()=>{handleAddNote()}}> Add Note</button>
          </div>          
      </div>
    </div>
  )
}
