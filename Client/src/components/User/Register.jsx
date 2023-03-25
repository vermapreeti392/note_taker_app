import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './User.css'
export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Rpassword, setRPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const handleContinue = ()=>{
        if(!email || !password || !Rpassword){
            setError('please add all the fieds')
            return
        }
        if(!email==""){
            if(!emailRegex.test(email)){
                setError('please enter a valid email')
                return
            }
        }
        if(password.length<7){
            setError('password must be greater than 7 characters');
            return
        }
        if(password!=Rpassword){
            setError('password not matched')
            return
        }
        else{
            fetch('https://note-app-dnd7.onrender.com/register',{
                method: 'post',
                mode : "cors",
                headers : {
                    'Content-Type' : 'Application/json',                 
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(res=>{
                return res.json();
            }).then(data=>{
                console.log(data);
                alert('Registration Successfull')
                navigate('/login')
            }).catch(e=>console.log(e))            
        }
    }
    return (
        <div className="Register-container">
            <div className='Register-main'>
                <div>
                <div className="heading mt-4 text-black-50">
                <h1> <span style={{fontSize: "55px"}}> <MdKeyboardArrowLeft /> </span> SIGN UP</h1>
                </div>
                <div className="inp">
                    <input type="email" className='Rinput' onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="EMAIL" />
                </div>
                <div className="inp">
                    <input type="password" className='Rinput' onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="PASSWORD" />
                </div>
                <div className="inp">
                    <input type="password" className='Rinput' onChange={(e) => { setRPassword(e.target.value) }} value={Rpassword} placeholder="REPEAT PASSWORD" />
                </div>
                <div className="checkbox mt-4">
                    <input type="checkbox" onChange={(e)=>{setAgree(e.target.checked)}} checked = {agree}/> I agree with the <a style={{color: "black"}} href="">TERMS & CONDITIONS</a>    
                </div>
                <div className="btn0 mt-3">
                    <button className='con px-4 py-1' type='submit' onClick={()=>{handleContinue()}} disabled = {!agree} >CONTINUE</button>
                </div>
                {error?<p style={{color: 'red'}}>{error}</p>: null}
                </div>
                <div className='frgt-pass mt-4'>
                            Already have an account? <span style={{ textDecoration: "underline", color: 'blue', cursor: 'pointer'}} onClick = {()=>navigate('/login')}>SignIn</span>
                </div>
            </div>
        </div>
    )
}
