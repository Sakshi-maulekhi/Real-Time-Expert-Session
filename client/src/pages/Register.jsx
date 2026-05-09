import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'

const Register = () => {

  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  });
  const [error, setError] = useState(null)

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };

  const handleClick = async e => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.message)
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='form__container'>
      <div className="login__container">
        <div className="login__content">
          <img src={loginImg} alt="" onError={(e) => e.target.src = userIcon} />
        </div>
        <div className="login__form">
          <div className="user">
            <img src={userIcon} alt="" />
          </div>
          <h2>Register</h2>

          <form onSubmit={handleClick}>
            <input type="text" placeholder='Username' required id='username' onChange={handleChange} />
            <input type="email" placeholder='Email' required id='email' onChange={handleChange} />
            <input type="password" placeholder='Password' required id='password' onChange={handleChange} />
            {error && <p style={{ color: 'red', margin: '5px 0' }}>{error}</p>}
            <button className='btn primary__btn auth__btn' type='submit'>Create Account</button>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
