import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './Home.css'
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);   
    
    const handleDetail = (id) => {
        navigate('/note/' + id)
    }

    useEffect(() => {
        const getnote = async () => {
            await fetch('https://note-app-dnd7.onrender.com/note', {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setData(data.note);
                }).catch(e => console.log(e))
        }        
            getnote();      
}, [])
    
    return (
        <>
            <div className='navb'>
                <Navbar />
            </div>
            <div className='Landing-main'>
                <div className="landing-container">
                    <div className=''>
                        <span><MdSearch className='search' />
                            <input type="search" className='inp-search' />
                        </span>
                    </div>
                    <div className="card-div">
                        <div className="note-card">
                            {data.map(result => {
                                return (
                                    <>
                                        <div className="note-div" onClick={() => { handleDetail(result._id) }}>
                                            <h4>{result.title}</h4>
                                            <p>{result.description}</p>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
