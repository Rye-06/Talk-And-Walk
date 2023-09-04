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
      <a class="btn" href='/Register'><span class="btn-text">Register</span></a>
      <a class="btn" href='/Login'><span class="btn-text">Login</span></a>
    </div>
    </>
  )
}

export default page