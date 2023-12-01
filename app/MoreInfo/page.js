"use client"
import React, {useState, useEffect} from 'react'
import LoginNavbar from '@/Components/loginNavbar/loginNavbar'
import Cookies from 'universal-cookie';

const MoreInfo = () => {

  const cookie = new Cookies()

  const [age, setAge] = useState()
  const [interests, setInterests] = useState()
  const [error, setError] = useState([]);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [success, setSuccess] = useState(false);

  const email = cookie.get('email')

  const successCallBack = (position) => {
    let LAT = position.coords.latitude;
    let LONG = position.coords.longitude;
    setLat(LAT);
    setLong(LONG);
  };

  const errorCallBack = (error) => {
    console.error(error)
  };

  useEffect(() => {

    // onload check if the user is logged in
    if (cookie.get('email') == null) {
      // user doesn't exist
      window.location.replace('http://localhost:3000');
    } else {
      // getting lat and long based on the current location
      navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack)
    }
  }, []);

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
      cookie.set('lat', lat)
      cookie.set('long', long)
    }
  };

  const sepInterests = (interests) => {
    interests = interests.replaceAll(' ', '');
    interests = interests.split(',');
    setInterests(interests)
  }

  return (
    <>
    <LoginNavbar />
    <h1>Before we proceed, please answer a few questions-</h1>
    <form onSubmit={handleSubmit}>
    <input type = "number" placeholder='Enter Age' autoComplete='off' id = 'age' onChange={(e) => setAge(e.target.value)} value={age}></input>
    <input type = "text" placeholder='Enter Interests (Seperate Each By a Comma)' autoComplete='off' id = 'interests' onChange={(e) => sepInterests(e.target.value)} value={interests}></input>

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