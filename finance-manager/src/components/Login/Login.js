import React, { useState } from 'react'
import './Login.css'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { login } from '../../backendInterface'

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

  // Login Call
  const handleLogin = async () => {
    await login(input.email, input.password)
  }

  return (
    <>
      <h3>Login</h3>

      <Input placeholder="Email" name="email" onChange={handleChange} type="text" />
      <br /><br />
      <Input placeholder="Password" name="password" onChange={handleChange} type="password" />
      <br /><br />
      <Button onClick={handleLogin}>Login</Button>

    </>
  )
}

export default Login