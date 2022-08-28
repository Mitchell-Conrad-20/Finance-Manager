import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'

const Nav = () => {
    return (
        <>
            <div className='navbar'>

                {/* Left side */}
                <div className='navbar-left'>
                    <Link to="/"><Button type="button-nav">Home</Button></Link>
                    <Link to="/dashboard"><Button type="button-nav">Dashboard</Button></Link>
                </div>

                {/* Right Side */}
                <div className='navbar-right'>
                    <Button type="button-nav">Logout</Button>
                </div>

            </div>
        </>
    )
}

export default Nav