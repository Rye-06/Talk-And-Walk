"use client"
import React, { useEffect } from 'react'
import Navbar from '@/Components/Navbar'
import './globals.css'
import Cookies from 'universal-cookie';

const page = () => {

  const cookie = new Cookies();

  useEffect(() => {
    // onload check if the user is logged in
    if (cookie.get('email') == null) {
      // user doesn't exist
    } 
    else{
      // user exists
      window.location.replace('http://localhost:3000/Home');
    }
  }, []);

  return (
    <>
    <Navbar />
    <h1>Talk and Walk</h1>
    <h2>It's time to explore what the world can bring you.</h2>
    <div className='wrapper'>
      <a className="btn" href='/Register'><span className="btn-text">Register</span></a>
      <a className="btn" href='/Login'><span className="btn-text">Login</span></a>
    </div>
    </>
  )
}

export default page