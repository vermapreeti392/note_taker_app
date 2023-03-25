import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Home/Navbar';
import './Note.css'
export default function UpdateNote() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { id } = useParams()
  useEffect(() => {
    fetch(`https://note-app-dnd7.onrender.com/note/${id}`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }).then(res => res.json())
        .then(data => {
            //console.log(data);
            setData(data.note);           
        })
}, [])

  const handleUpdate = (id) => {  
    fetch(`https://note-app-dnd7.onrender.com/update/${id}`,{
      method: 'put',
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
        alert('note updated successfully');
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
            <button className='noteaddbtn' type='submit' onClick={()=>{handleUpdate(data._id)}}> Update</button>
          </div>          
      </div>
    </div>
  )
}
