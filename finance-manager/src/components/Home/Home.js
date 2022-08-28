import React, { useState, useEffect } from 'react'
import './Home.css'
import Login from '../Login/Login'
import Button from '../Button/Button'
import { logout, getCurrentUser } from '../../backendInterface'

const Home = () => {

  // State variable to hold the current user
  const [user, setUser] = useState({
    id: null,
    email: null
  })

  // Get the current user
  useEffect(() => {
    async function fetchData() {
      await getCurrentUser()
        .then(userResp => {
          setUser({
            id: userResp.id,
            email: userResp.email
          })
        })
    }

    fetchData();
  }, [])

  // Handle the logout
  const handleLogout = async () => {
    await logout()
      .then(() => {
        setUser({
          id: null,
          email: null
        })
      })
      .catch(err => {
        console.log(err)
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
        <Button onClick={handleLogout}>Logout</Button>
      }

    </div>
  )
}

export default Home