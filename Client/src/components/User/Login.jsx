import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './User.css'
export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState(false);
    const handleLogin = () => {
        if (!email || !password) {
            setError('please add all the fieds')
            return
        }
        else {
            fetch('http://localhost:5000/login', {
                method: 'post',
                mode: "cors",
                headers: {
                    'Content-Type': 'Application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(res => {
                return res.json();
            }).then(data => {
                //console.log(data);
                if (data.error) {
                    alert(data.error);
                }
                else {
                    localStorage.setItem('token', data.token);
                    alert('Login Successfull')
                    navigate('/note')
                }

            }).catch(e => console.log(e))
        }
    }
    return (
        <div className="login-container">
            <div className='login-main'>
                <div>
                    <div className="Sheading mt-4 ">
                        <h1>Sign In</h1>
                    </div>
                    {error ? <p style={{ color: 'red', marginTop: '5px', marginBottom: '5px' }}>{error}</p> : null}
                    <div className="lg-input">
                        <div className="login-inp">
                            <label htmlFor="">Email address</label>
                            <input type="email" className='input1' onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="EMAIL" />
                        </div>
                        <div className="login-inp">
                            <label htmlFor=""> Password </label>
                            <input type="password" className='input1' onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="PASSWORD" />
                        </div>
                        <div className="checkbox mt-4">
                            <input type="checkbox" className='lg-check' onChange={(e) => { setRemember(e.target.checked) }} checked={remember} /> Remember me
                        </div>
                        <div className="btn0 mt-3">
                            <button className='con px-4 py-1 input1' type='submit' onClick={() => { handleLogin() }} >Submit</button>
                        </div>
                        <div className='frgt-pass'>
                            Forgot <span style={{ textDecoration: "underline", color: 'blue', cursor: 'pointer'}} >Password?</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
