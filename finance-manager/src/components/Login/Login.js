import React, { useState } from 'react'
import './Login.css'

const Login = () => {

  // State object for user input
  const [input, setInput] = useState({
    "email": "",
    "password": ""
  })

  // Event handler to update input state
  const handleChange = (e) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Login Post
  const login = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: input.email,
        password: input.password
      })
    }

    try {
      await fetch('http://127.0.0.1:5000/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h3>Login</h3>

      <input placeholder="Email" name="email" onChange={handleChange} type="text" />
      <br /><br />
      <input placeholder="Password" name="password" onChange={handleChange} type="password" />
      <br /><br />
      <button onClick={login}>Login</button>

    </>
  )
}

export default Login