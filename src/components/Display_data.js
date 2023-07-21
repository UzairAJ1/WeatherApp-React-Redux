import React from 'react'
import { useSelector, useDispatch } from "react-redux";
const Display_data = () => {
    const dispatch=useDispatch();
    const weatherData=useSelector((state)=>state.weather)
   
  return (
   <>
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
      </div></>
  )
}

export default Display_data