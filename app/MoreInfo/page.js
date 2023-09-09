"use client"
import React, {useState} from 'react'
import LoginNavbar from '@/Components/loginNavbar/loginNavbar'
import Cookies from 'universal-cookie';

const MoreInfo = () => {

  const cookie = new Cookies()

  const [age, setAge] = useState()
  const [interests, setInterests] = useState()
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const email = cookie.get('email')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("../api/moreInfo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        age,
        interests
      }),
    });

    const { msg, age, interests, success } = await res.json();
    setError(msg);
    setAge(age)
    setInterests(interests)
    setSuccess(success);

    if (success) {
      window.location.replace('http://localhost:3000/Home');
      // set cookies
      cookie.set('age', age)
      cookie.set('interests', interests)
    }
  };

  return (
    <>
    <LoginNavbar />
    <h1>Before we proceed, please answer a few questions-</h1>

    </>
  )
}

export default MoreInfo