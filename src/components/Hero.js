
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllWeather, addCity } from '../features/weather/weatherSlice';
import getLocation from '../functions/getLocation';
import Display_data from './Display_data';
import Error from './Error';
const Hero = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getLocation({ setLocation, setLoading, setError });

  }, []);
  console.log(location)

  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather)

  const [redux, setRedux] = useState(false);
  const [city, setCity] = useState("");

  if (weatherData.isLoading) {
    return (
      <h1 >...Loading</h1>
    )
  }

  const handlesubmit = () => {
    dispatch(addCity(location.city))
    dispatch(getAllWeather());


    setRedux(true);

  }
  const handleSelected = () => {
    dispatch(addCity(city));
    dispatch(getAllWeather());
    setRedux(true);
  }

  return (
    <>

      <div className='w-full h-screen bg-[#1C2257] flex flex-col items-center justify-center'>
        <h1 className='text-white text-xl font-bold'>My Weather app</h1>
        <div className='w-5/6 h-5/6 bg-[#061543] rounded-3xl'>
          {/* <input onChange={(e)=>setCity(e.target.value)}/> */}
          <h1 className='text-white mt-12'>Get Your Location's Weather  Data</h1>
          {location === null &&
            <Error />
          }
          {location !== null &&
            <button onClick={handlesubmit} className='bg-black text-white w-20'>GET</button>
          }

          {/* { usersData.users.map((user, index) => (
      
        <div className='text-white' key={index}>{user.base}</div>

        
    
     
      ))} */}
          {redux &&
            <Display_data />
          }
          <div className='mt-10 text-white flex flex-col items-center justify-center gap-5'>
            <h1>Or Search any City or Country</h1>
            <input className="text-black" onChange={(e) => { setCity(e.target.value) }} />
            <button onClick={handleSelected} className='bg-black text-white w-20'>Submit</button>
          </div>


        </div>
      </div>
    </>
  )
}

export default Hero