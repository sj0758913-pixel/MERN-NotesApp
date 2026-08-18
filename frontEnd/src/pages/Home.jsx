import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Home = () => {
  const API = import.meta.env.VITE_API_URL;

  const [signInbtn, setsignInbtn] = useState('Sign in')
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLog = () => {
    setsignInbtn('Signing in...')
    axios.post(API + "/Login", { email: email, password: password }, {
      withCredentials: true
    })
      .then(result => {
        setsignInbtn('Sign in')
        navigate("/notes")
      })

      .catch(err => {
        console.log("something went wrong", err);
        setsignInbtn('Sign in')
      })
    setEmail('')
    setPassword('')
  }

  return (
    <>

      <div className="Login-page">
        <div className='tags'>
          <div className='tag'>
            <img src="/notesIcon.png" alt="Log0" />
            <h2>Your Personal Notes</h2>


          </div>
          <p>Keep your thoughts, ideas, and <br /> important notes organized in one place.</p>

        </div>


        <div className='signUps'>

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
            <button onClick={handleLog}>{signInbtn}</button>
            <div className='not-login'>
              <p>Don't have an account ?</p>
              <Link to="/" >Create Account</Link>
            </div>
          </div>
        </div>

      </div>


    </>
  )
}

export default Home
