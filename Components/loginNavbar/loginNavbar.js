import React from 'react'
import './loginNavbar.css'

const LoginNavbar = () => {

  const logout = () => {
    
  }

  return (
    <>
    <nav className="navbar">
    <a href="/Home" className="nav-item">Home</a>
    <a href="/About" className="nav-item">About</a>
    <a href="/Contact" className="nav-item">Contact</a>
    <a href="/" className="nav-item">Logout</a>
    </nav>
    </>
  )
}

export default LoginNavbar