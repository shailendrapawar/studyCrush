import React, { useState } from 'react';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import axios from 'axios';
import toast from 'react-hot-toast';

import{} from "react-router"
import { setAuthUser, setUserNotification } from '../../store/slices/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const { currentTheme } = useSelector(s => s.theme)
  // console.log(currentTheme)

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")


  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const isLogin = await axios.post(import.meta.env.VITE_API_URL + `/auth/login`, {
        identifier,
        password
      }, { withCredentials: true });

      if (isLogin) {
        // console.log(isLogin)
        toast.success(isLogin.data.msg)
        dispatch(setAuthUser(isLogin.data.user))
        dispatch(setUserNotification(isLogin.data.user.notifications))
        setTimeout(() => {
          navigate("/user/")
        }, 1000);
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.msg)
    }
  }


  return (
    <div className={` h-full flex justify-center items-center`} style={{ backgroundColor: currentTheme.background }}>
      <section className="h-100 w-[95%] max-w-100 rounded-md flex flex-col justify-evenly pl-2 pr-2" style={{ backgroundColor: currentTheme.cardBackground, border: `1px solid ${currentTheme.line}` }}>

        <h3 className=' text-4xl text-center'><b className='text-blue-500'>L</b>ogin</h3>


        <form onSubmit={handleLogin} className='w-full h-auto flex flex-col items-center gap-3'>
          <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} required type='text' className='h-12 w-[90%] outline-none pl-2  text-sm rounded-sm' style={{ background: currentTheme.background, color: currentTheme.textPrimary, border: `1px solid ${currentTheme.line}` }} placeholder='enter you email or username'></input>
          <input value={password} onChange={(e) => setPassword(e.target.value)} required type='text' className='h-12 w-[90%] outline-none pl-2 text-sm  rounded-sm' style={{ background: currentTheme.background, border: `1px solid ${currentTheme.line}` }} placeholder='enter you password'></input>
          <button className='h-10 w-[90%] rounded-md mt-2' style={{ backgroundColor: currentTheme.accent }}>Log in</button>
        </form>

        <span className='text-sm underline text-center' style={{ color: currentTheme.textPrimary }}
          onClick={() => navigate("/register")}
        >Not registered? Sign up</span>
      </section>
    </div>
  )
}
export default Login