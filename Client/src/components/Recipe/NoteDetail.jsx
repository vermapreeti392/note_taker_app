import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Home/Navbar'
import './Note.css'
export default function NoteDetail() {
    const [data, setData] = useState([]);        
    const navigate = useNavigate()
    const { id } = useParams()
    const handleUpdate = (id) => {
        navigate('/update/' + id)
    }
    useEffect(() => {
        fetch(`http://localhost:5000/note/${id}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data.note)
            })
    }, [])
    const handleDelete = async(id)=>{
        await fetch(`http://localhost:5000/delete/${id}`,{
          method: 'delete',        
        })
        .then(res=>res.json())
        .then(data=>{
            navigate('/note')
          alert('deleted successfully');                    
          
        })
    }
    return (
        <>
            <div className="navb">
                <Navbar />
            </div>
            <div className='detailmain-div'>
                <div className='detail-div py-5'>
                    <div className='divD-1'><h3 className='py-2 px-2'>{data.title}</h3></div>
                    <div className='divD-1 mt-2 '><p className='py-2 px-2'>{data.description}</p></div>
                    <div className='btns '>
                        <button className='btn-up' onClick={()=>{handleDelete(data._id)}}>Delete</button>
                        <button className='btn-up' onClick={()=>{handleUpdate(data._id)}}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}
