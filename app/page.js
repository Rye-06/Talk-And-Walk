"use client"
import React from 'react'
import Navbar from '@/Components/Navbar'

const page = () => {
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