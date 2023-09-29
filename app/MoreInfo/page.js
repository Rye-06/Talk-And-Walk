"use client"
import React, {useState, useEffect} from 'react'
import LoginNavbar from '@/Components/loginNavbar/loginNavbar'
import Cookies from 'universal-cookie';
import {
  fromPlaceId
} from "react-geocode";

const MoreInfo = () => {

  const cookie = new Cookies()

  const [age, setAge] = useState()
  const [interests, setInterests] = useState()
  const [error, setError] = useState([]);
  const [address, setAddress] = useState([]);
  const [success, setSuccess] = useState(false);

  const email = cookie.get('email')

  let lat = ""
  let long = ""

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // getting lat and long based on the address

    // Get latitude & longitude from place_id.
    fromPlaceId(address)
    .then(({ results }) => {
      const { LAT, LNG } = results[0].geometry.location;
      console.log(LAT, LNG);
      lat = LAT;
      long = LNG;
    })
    .catch(console.error);


    const res = await fetch("../api/moreInfo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        age,
        interests,
        lat,
        long
      }),
    });

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      window.location.replace('http://localhost:3000/Home');
      // set cookies
      cookie.set('age', age)
      cookie.set('interests', interests)
    }
  };

  const sepInterests = (interests) => {
    interests = interests.replaceAll(' ', '');
    interests = interests.split(',');
    setInterests(interests)
  }

  useEffect(() => {

    // onload check if the user is logged in
    if (cookie.get('email') == null) {
      // user doesn't exist
      window.location.replace('http://localhost:3000');
    }
  }, []);

  return (
    <>
    <LoginNavbar />
    <h1>Before we proceed, please answer a few questions-</h1>
    <form onSubmit={handleSubmit}>
    <input type = "number" placeholder='Enter Age' autoComplete='off' id = 'age' onChange={(e) => setAge(e.target.value)} value={age}></input>
    <input type = "text" placeholder='Enter Interests (Seperate Each By a Comma)' autoComplete='off' id = 'interests' onChange={(e) => sepInterests(e.target.value)} value={interests}></input>

    <input type = "text" placeholder='Enter Address' autoComplete='off' id = 'address' onChange={(e) => setAddress(e.target.value)} value={address}></input>
    <button type = "submit">Submit</button>
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

export default MoreInfo