"use client"
import React, { useEffect, useState} from 'react'
import LoginNavbar from '@/Components/loginNavbar/loginNavbar'
import Cookies from 'universal-cookie';

const home = () => {

  const cookie = new Cookies();

  const [name, setName] = useState()

  useEffect(() => {

    if (cookie.get('age') == 0) {
      window.location.replace('http://localhost:3000/MoreInfo');
    }

    // onload check if the user is logged in
    if (cookie.get('email') == null) {
      // user doesn't exist
      window.location.replace('http://localhost:3000');
    } 
    else{
      // user exists
      // gets value of name
      let n = cookie.get('name').toString()
      n = n.replaceAll('"', '')
      setName(n)
    }
  }, []);

  return (
    <>
      <LoginNavbar />
      <h1>Welcome {name}!</h1>

      <h2>People closest to you:</h2>
    </>
  )
}

export default home