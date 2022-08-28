import React, { useState, useEffect } from 'react'
import './Home.css'
import Login from '../Login/Login'
import httpClient from '../../httpClient'
import Button from '../Button/Button'

const Home = () => {

  // State variable to hold the current user
  const [user, setUser] = useState({
    id: null,
    email: null
  })

  // Get the current user, return if user is already set
  useEffect(() => {
    async function fetchData() {
      await httpClient.post("//localhost:5000/getCurrentUser")
        .then(resp => resp.data)
        .then(data => {
          console.log(data)
          setUser({
            id: data.id,
            email: data.email
          })
        })
    }

    fetchData();
  }, [])

  // Log the user out
  const logout = async () => {
    await httpClient.post("//localhost:5000/logout")
      .then(resp => resp.data)
      .then(data => {
        console.log(data)
        setUser({
          id: null,
          email: null
        })
      })
  }

  return (
    <div>
      <h1>Home</h1>

      {/* Show the login form if there is no active session */}
      {!user.id &&
        <Login />
      }

      {/* Show the logout button if there is an active session */}
      {user.id &&
        <Button onClick={logout}>Logout</Button>
      }

    </div>
  )
}

export default Home