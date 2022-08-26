import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <>
      <h3>Login</h3>
      
      <form>
        <input maxLength="20" placeholder="Username" type="text"/>
        <input maxLength="20" placeholder="Password" type="password"/>
        <button formAction='submit'>Login</button>
      </form>

    </>
  )
}

export default Login