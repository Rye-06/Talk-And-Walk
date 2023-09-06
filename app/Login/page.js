"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '@/Components/Navbar'
import '../globals.css'
import Cookies from 'universal-cookie';

const Login = () => {

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

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email: ", email);
    console.log("Password: ", password);

    const res = await fetch("../api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const { msg, name, success } = await res.json();
    setError(msg);
    setName(name);
    setSuccess(success);

    if (success) {
      window.location.replace('http://localhost:3000/Home');
      // set cookies
      cookie.set('name', name)
      cookie.set('email', email)
      cookie.set('password', password)
    }
  };


  return (
    <>
    <Navbar />
    <form onSubmit={handleSubmit}>
    <input type = "text" placeholder='Enter Email' autoComplete='off' id = 'email' onChange={(e) => setEmail(e.target.value)} value={email}></input>
    <input type = "password" placeholder='Enter Password' autoComplete='off' id = 'password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
    <button type = "submit">Login</button>
    </form>

    <div>
        {error &&
          error.map((e) => (
            <div>
              {e}
            </div>
          ))}
    </div>
    </>
  )
}

export default Login