
import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers,addCity } from '../features/todo/todoSlice';
import getLocation from './getLocation';
const Hero = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation({setLocation,setLoading,setError});
    
  }, []);

  
  const dispatch=useDispatch();
  const usersData=useSelector((state)=>state.todo)
  console.log(usersData);
  const [redux,setRedux]=useState(false);
  const [city,setCity]=useState("");
  
  if(usersData.isLoading)
  {
    return (
      <h1>...Loading</h1>
    )
  }
  const handlesubmit=()=>
  {
    dispatch(addCity(location.city))
    dispatch(getAllUsers());
    
    
    setRedux(true);
    
  }
  const handleSelected=()=>
  {
    dispatch(addCity(city));
    dispatch(getAllUsers());
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
      <div >Location : {usersData.users.name}</div>
      <div >ID : {usersData.users.id}</div>
      <div >TimeZone : {usersData.users.timezone}</div>
      <div >{usersData.users.sys.country}</div>
      <div >Temp : {usersData.users.main.temp}</div>
      <div >{usersData.users.weather.main}</div>
      { usersData.users.weather.map((user, index) => (
      <>
        <div className='text-white' key={index}>Weather:  {user.main}</div>
        <div className='text-white'>Description :  {user.description}</div>
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