
import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllWeather,addCity } from '../features/weather/weatherSlice';
import getLocation from './getLocation';
const Hero = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation({setLocation,setLoading,setError});
    
  }, []);

  
  const dispatch=useDispatch();
  const weatherData=useSelector((state)=>state.weather)
 
  const [redux,setRedux]=useState(false);
  const [city,setCity]=useState("");
  
  if(weatherData.isLoading)
  {
    return (
      <h1>...Loading</h1>
    )
  }
  const handlesubmit=()=>
  {
    dispatch(addCity(location.city))
    dispatch(getAllWeather());
    
    
    setRedux(true);
    
  }
  const handleSelected=()=>
  {
    dispatch(addCity(city));
    dispatch(getAllWeather());
    setRedux(true);
  }
  
  return (
    <div className='w-full h-screen bg-[#1C2257] flex flex-col items-center justify-center'>
      <h1 className='text-white'>My Weather app</h1>
        <div className='w-5/6 h-5/6 bg-[#061543] rounded-3xl'>
          {/* <input onChange={(e)=>setCity(e.target.value)}/> */}
          <h1 className='text-white mt-12'>Get Your Location's Weather  Data</h1>
          <button onClick={handlesubmit} className='bg-black text-white w-20'>GET</button>
          
          
          {/* { usersData.users.map((user, index) => (
      
        <div className='text-white' key={index}>{user.base}</div>

        
    
     
      ))} */}
      { redux &&
      <div className='text-white mt-6'>
      <h1 >Weather Data</h1>
      <div >Location : {weatherData.data.name}</div>
      <div >ID : {weatherData.data.id}</div>
      <div >TimeZone : {weatherData.data.timezone}</div>
      <div >{weatherData.data.sys.country}</div>
      <div >Temp : {weatherData.data.main.temp}</div>
      <div >{weatherData.data.weather.main}</div>
      { weatherData.data.weather.map((data, index) => (
      <>
        <div className='text-white' key={index}>Weather:  {data.main}</div>
        <div className='text-white'>Description :  {data.description}</div>
        </>
        
    
     
      ))}
         
{/* {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <h1>city:{location.city} </h1>
        </div>
      ) : null} */}
      </div>
      }
        <div className='mt-10 text-white flex flex-col items-center justify-center gap-5'>
          <h1>Or Search any Country</h1>
          <input className="text-black" onChange={(e)=>{setCity(e.target.value)}}/>
          <button  onClick={handleSelected} className='bg-black text-white w-20'>Submit</button>
          </div>
      
     
        </div>
    </div>
  )
}

export default Hero