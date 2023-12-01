"use client"
import React, { useEffect, useState} from 'react'
import LoginNavbar from '@/Components/loginNavbar/loginNavbar'
import Cookies from 'universal-cookie';

const home = () => {

  const cookie = new Cookies();

  const [name, setName] = useState()

  const [lat, setLat] = useState()
  
  const [long, setLong] = useState()

  const [people, setPeople] = useState([]);

  function distance(lat1, lon1, lat2, lon2) {
    const r = 6371; // km
    const p = Math.PI / 180;
  
    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                  + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                    (1 - Math.cos((lon2 - lon1) * p)) / 2;
  
    return 2 * r * Math.asin(Math.sqrt(a));
  }

  const handleOnload = async (e) => {
    e.preventDefault();

    const res = await fetch("../api/home", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
      }),
    });

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);
    setPeople(people)

    if (success) {
      window.location.replace('http://localhost:3000/MoreInfo');
      console.log(people);
    }
  };

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
      handleOnload()
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