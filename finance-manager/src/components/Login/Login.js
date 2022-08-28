import React, { useState } from 'react'
import httpClient from '../../httpClient'
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
    await httpClient.post('//localhost:5000/login', {
      email: input.email,
      password: input.password
    })
      .then(resp => resp.data)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
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