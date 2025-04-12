import React, { useState } from 'react';
import { useNavigate } from "react-router"

import { useSelector } from "react-redux"

const Register = () => {
  const navigate=useNavigate();


  const { currentTheme } = useSelector(s => s.theme)
  // console.log(currentTheme)

  return (
    <div className={` h-full flex justify-center items-center`} style={{ backgroundColor: currentTheme.background }}>

      <section className="h-120 w-[95%] max-w-100 rounded-md flex flex-col justify-evenly pl-2 pr-2" style={{ backgroundColor: currentTheme.cardBackground, border: `none` }}>

        <h3 className=' text-4xl text-center'><b className='text-blue-500'>R</b>egister</h3>


        <form className='w-full h-auto flex flex-col items-center gap-2'>
          <input required type='text' className='h-12 w-[90%] outline-none pl-2 pr-1  text-sm rounded-sm' style={{background:currentTheme.background,color:currentTheme.textPrimary,border:`1px solid ${currentTheme.line}`}} placeholder='enter you name'></input>
          <input required type='text' className='h-12 w-[90%] outline-none pl-2 pr-1 text-sm  rounded-sm' style={{background:currentTheme.background,color:currentTheme.textPrimary,border:`1px solid ${currentTheme.line}`}} placeholder='enter you username'></input>
          <input required type='email' className='h-12 w-[90%] outline-none pl-2 pr-1 text-sm  rounded-sm' style={{background:currentTheme.background,color:currentTheme.textPrimary,border:`1px solid ${currentTheme.line}`}} placeholder='enter you email'></input>
          <input required type='text' className='h-12 w-[90%] outline-none pl-2 pr-1 text-sm  rounded-sm' style={{background:currentTheme.background,color:currentTheme.textPrimary,border:`1px solid ${currentTheme.line}`}} placeholder='enter you password'></input>
          <button className='h-10 w-[90%] rounded-md mt-2' style={{backgroundColor:currentTheme.accent}}>Sign up</button>
        </form>

        <span className='text-sm underline text-center' style={{color:currentTheme.textPrimary}}
        onClick={()=>navigate("/login")}
        >Already a user? Log in instead</span>
      </section>
    </div>
  )
}
export default Register