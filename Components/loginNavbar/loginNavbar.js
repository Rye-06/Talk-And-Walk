import React from 'react'
import './loginNavbar.css'
import Cookies from 'universal-cookie';

const LoginNavbar = () => {

  const cookie = new Cookies();

  const logout = () => {
    // delete all cookies
    cookie.remove('name')
    cookie.remove('email')
    cookie.remove('password')
  }

  return (
    <>
    <nav className="navbar">
    <a href="/Home" className="nav-item">Home</a>
    <a href="/About" className="nav-item">About</a>
    <a href="/Contact" className="nav-item">Contact</a>
    <a href="" onClick={logout} className="nav-item">Logout</a>
    </nav>
    </>
  )
}

export default LoginNavbar