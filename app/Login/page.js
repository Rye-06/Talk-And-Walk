"use client"
import React, { useState } from 'react'
import Navbar from '@/Components/Navbar'

const Login = () => {
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

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);
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