import React, { useState } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import { useSelector } from "react-redux"

const Login = () => {
  const { currentTheme } = useSelector(s => s.theme)
  console.log(currentTheme)

  return (
    <div className={` h-full flex justify-center items-center`} style={{ backgroundColor: currentTheme.background }}>
      <section className="h-100 w-[95%] max-w-100 rounded-md flex flex-col justify-evenly pl-2 pr-2" style={{ backgroundColor: currentTheme.cardBackground, border: `none` }}>

        <h3 className=' text-4xl text-center'><b className='text-blue-500'>L</b>ogin</h3>


        <form className='w-full h-auto flex flex-col items-center gap-3'>
          <input required type='text' className='h-12 w-[90%] outline-none pl-2  text-sm rounded-sm' style={{background:currentTheme.background,color:currentTheme.textPrimary,border:`1px solid ${currentTheme.line}`}} placeholder='enter you email or username'></input>
          <input required type='text' className='h-12 w-[90%] outline-none pl-2 text-sm  rounded-sm' style={{background:currentTheme.background,border:`1px solid ${currentTheme.line}`}} placeholder='enter you password'></input>
          <button className='h-10 w-[90%] rounded-md mt-2' style={{backgroundColor:currentTheme.accent}}>Log in</button>
        </form>

        <span className='text-sm underline text-center' style={{color:currentTheme.textPrimary}}>Not registered? Sign up</span>
      </section>
    </div>
  )
}
export default Login