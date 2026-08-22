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

  // loading btn
  const [loadingbtn , setLoadingbtn] = useState('');

  // popup message
  const [showMessage, setShowMessage] = useState(false);
  const [popText,setpopText] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLog = () => {
        if (email.trim() === "" || password.trim() === "") {
          setpopText("⚠️ Fill all fields")
        setShowMessage(true);
        return;
    }
    setLoadingbtn(true)
    axios.post(API + "/Login", { email: email, password: password }, {
      withCredentials: true
    })
      .then(result => {
        setsignInbtn('Sign in')
        setLoadingbtn(false)
        navigate("/notes")

      })

      .catch(err => {
        console.log("something went wrong", err);
        setLoadingbtn(false)
        setpopText("Invalid Values")
        setShowMessage(true)
        setsignInbtn('Sign in')
      })
    setEmail('')
    setPassword('')
    setpopText('');
  }

  return (
    <>

      <div className="Login-page">
        <div className='tags'>
          <div className='tag'>
            <img src="/notesIcon.png" alt="Logo" />
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
            <button onClick={handleLog}>{ loadingbtn ? <div className='spinnerbtn'></div> : signInbtn}</button>
            <div className='not-login'>
              <p>Don't have an account ?</p>
              <Link to="/" >Create Account</Link>
            </div>
          </div>
        </div>

      </div>

      {showMessage && (
    <div className="popup-overlay">
        <div className="popup">
            <h3>{popText}</h3>

            <p>Please fill the required or correct values.</p>

            <button onClick={() => setShowMessage(false)}>
                OK
            </button>
        </div>
    </div>
)}


    </>
  )
}

export default Home
