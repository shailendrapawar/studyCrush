import React, { useState } from 'react';
import { useNavigate } from "react-router"

import { useSelector } from "react-redux"
import toast from 'react-hot-toast';
import axios from "axios"

const Register = () => {
  const navigate = useNavigate();

  const { currentTheme } = useSelector(s => s.theme)
  // console.log(currentTheme)
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    // console.log(value)
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  //====handling register =============
  const handleResgister = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      if (!userData.name || !userData.username || !userData.email || !userData.password) {
        toast.error("All feilds are required");

        return
      }
      const isRegistered = await axios.post(import.meta.env.VITE_API_URL + `/auth/register`, userData, {
        withCredentials: true
      });

      console.log(isRegistered);
      if(isRegistered){
        toast.success(isRegistered.data.msg)
        setUserData({
          username: "",
          name: "",
          email: "",
          password: ""
        })
        navigate("/login")
      }

    } catch (err) {
      // console.log("error==",err)
      toast.error(err.response.data.msg)
    }
  }

  return (
    <div className={` h-screen flex justify-center items-center`} style={{ backgroundColor: currentTheme.background }}>

      <section className="h-130 w-[95%] max-w-100 rounded-md flex flex-col justify-evenly pl-2 pr-2" style={{ backgroundColor: currentTheme.cardBackground, border: ` 1px solid ${currentTheme.line}` }}>

        <h3 className=' text-4xl text-center'><b className='text-blue-500'>R</b>egister</h3>

        <form onSubmit={handleResgister} className='w-full h-auto flex flex-col items-center gap-2'>
          <input value={userData.name} onChange={(e) => handleChange(e)} name="name" required type='text' className='h-12 w-[90%] outline-none pl-2 pr-1  text-sm rounded-sm' style={{ background: currentTheme.background, color: currentTheme.textPrimary, border: `1px solid ${currentTheme.line}` }} placeholder='enter you name'></input>
          <input value={userData.username} onChange={(e) => handleChange(e)} required type='text' name='username' className='h-12 w-[90%] outline-none pl-2 pr-1 text-sm  rounded-sm' style={{ background: currentTheme.background, color: currentTheme.textPrimary, border: `1px solid ${currentTheme.line}` }} placeholder='enter you username'></input>
          <input value={userData.email} onChange={(e) => handleChange(e)} required type='email' name='email' className='h-12 w-[90%] outline-none pl-2 pr-1 text-sm  rounded-sm' style={{ background: currentTheme.background, color: currentTheme.textPrimary, border: `1px solid ${currentTheme.line}` }} placeholder='enter you email'></input>
          <input value={userData.password} onChange={(e) => handleChange(e)} required type='text' name='password' className='h-12 w-[90%] outline-none pl-2 pr-1 text-sm  rounded-sm' style={{ background: currentTheme.background, color: currentTheme.textPrimary, border: `1px solid ${currentTheme.line}` }} placeholder='enter you password'></input>
          <button className='h-10 w-[90%] rounded-md mt-2' style={{ backgroundColor: currentTheme.accent }}>Sign up</button>
        </form>

        <span className='text-sm underline text-center cursor-pointer' style={{ color: currentTheme.textPrimary }}
          onClick={() => navigate("/login")}
        >Already a user? Log in instead</span>
      </section>
    </div>
  )
}
export default Register