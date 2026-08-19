import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Register = () => {
  const API = import.meta.env.VITE_API_URL;

  const [registerbtn, setRegisterbtn] = useState('Create Account')
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')

  // for clickecbtn
  const [Clicked, setClicked] = useState(false)

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleUser = (e) => {
    setUser(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleAdd = () => {
    setRegisterbtn('Creating...')
    axios.post(API + "/register", { email: email, username: username, password: password }, {
      withCredentials: true
    })
      .then(result => {
        navigate("/notes");
        setRegisterbtn('Create Account');

      })
      .catch(err => {
        setRegisterbtn('Create Account');
      })
    setEmail('')
    setPassword('')
    setUser('')
    setClicked(false)
  }
  return (
    <>

      <div className="Register-page">
        <div className='tags'>
          <div className='tag'>
              <img src="/notesIcon.png" alt="Log0" />
              <h2>Your Personal Notes</h2>
              

          </div>
          <p>Keep your thoughts, ideas, and <br /> important notes organized in one place.</p>

        </div>
       <div className='signUps'>
           <div className='Sign-Up'>
          <h2>Create Account</h2>
          <hr />

          <label>Enter Email :</label>
          <input
            value={email}
            type="email" onChange={handleEmail} placeholder='Enter email' />
          <br />
          <label>Create Username :</label>
          <input
            value={username}
            type="text" onChange={handleUser} placeholder='Create username' />
          <br />
          <label>Enter Password :</label>
          <input
            value={password}
            type="password" onChange={handlePassword} placeholder='Enter Password' />
          <br />
          <button className={Clicked ? 'clickedRegisterbtn': ''} onClick={()=>{
            handleAdd()
            setClicked(true)
          }}>{registerbtn}</button>
          <div className='signup'>
            <p>Already have an account ?</p>
            <Link to="/Home">Login</Link>
          </div>
        </div>

       </div>
        
      </div>


    </>
  )
}

export default Register
