import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

const Home = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }

    const handlePassword = (e)=>{
    setPassword(e.target.value)
  }

      const handleLog =  ()=>{
        axios.post(API+"/Login" , {email : email , password : password}, {
        withCredentials: true
    })
        .then(result =>{
           navigate("/notes")})
        .catch(err =>{
           console.log(err)
        })
        setEmail('')
        setPassword('')
      }

  return (
   <>

<div className="Login-page">
          <div className='Login'>
          <h2>Log in</h2>
          <hr />
      
      <label>Enter Email :</label>
        <input
        value={email} 
        type="email" onChange={handleEmail} placeholder='Enter email' />
        <br />
        <label>Enter Password :</label>
        <input 
        value={password} 
        type="password" onChange={handlePassword} placeholder='Enter Password' />
        <br />
        <button onClick={handleLog}>Sign in</button>
   <div className='not-login'>
       <p>Don't have an account ?</p>
      <Link to="/" >Create Account</Link>
   </div>
    </div>
</div>

    
   </>
  )
}

export default Home
