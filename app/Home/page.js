"use client"
import React, { useEffect, useState} from 'react'
import LoginNavbar from '@/Components/loginNavbar/loginNavbar'
import Cookies from 'universal-cookie';

const home = () => {

  const cookie = new Cookies();

  const [name, setName] = useState()

  useEffect(() => {

    // onload check if the user is logged in
    if (cookie.get('email') == null) {
      // user doesn't exist
      window.location.replace('http://localhost:3000');
    } 
    else{
      // user exists
      // get value of name
      let n = cookie.get('name').toString()
      n = n.replaceAll('"', '')
      setName(n)
    }
  }, []);

  return (
    <>
      <LoginNavbar />
      <h1>Welcome {name}!</h1>
    </>
  )
}

export default home