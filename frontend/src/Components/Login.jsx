import React, { useState } from 'react'
import Axios from '../utils/Axios'
import { Link, useNavigate } from 'react-router-dom'
import summeryApi from '../common/SummeryApi'

const Login = () => {
  const navigate = useNavigate()
  const [state,setState] = useState({
    email:"",
    password:""
  })
  const [showPassword,setShowPassword] = useState(false)

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setState(prev=>({...prev,[name]:value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const response = await Axios({
        ...summeryApi.login,
        data:state
    })
    
      if(response.data.success){
        localStorage.setItem('accessToken',response.data.data.accessToken)
        localStorage.setItem('refreshToken',response.data.data.refreshToken)
        setState({
          email:"",
          password:""
        })
        navigate("/")
      }

    }catch(error){
      console.log("Error")
    }
  }

  

  return (
    <div className='flex flex-col sm:w-full sm:items-center justify-center min-h-screen px-4 bg-gray-50'>
      <div className='flex flex-col mb-2'>
        <p className='flex font-semibold gap-1 sm:text-xl justify-center'>WELCOME</p>
        <p className=' text-blue-500 text-sm'>Login in to your account!</p>
      </div>
        <form className='flex flex-col border sm:justify-center border-gray-300 rounded px-4 py-2 sm:p-4 text-gray-600 gap-3 sm:w-[420px] sm:h-[350px] sm:px-10 bg-white pt-8' onSubmit={onSubmitHandler}>
          <div className='flex flex-col gap-2 max-w-md'>
            <p className='text-sm'>Email</p>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                </svg>
              </div>
              <input type="email" name='email' value={state.email} onChange={onChangeHandler} autoComplete='off'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none h-[35px] sm:h-[40px] rounded" placeholder="Enter Your Email"/>
            </div>
          </div>
          <div className='flex flex-col gap-2 max-w-md'>
          <p className='text-sm sm:text-auto'>Password</p>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img src="./src/assets/password.svg" alt="" className='w-5'/>
              </div>
              <div className='flex group'>
                <input type={showPassword?"text":"password"} name='password' value={state.password} onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  group-focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-[300px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none h-[35px] sm:h-[40px] rounded rounded-r-none" placeholder="Enter Your Password"/>
                <div className='flex border  items-center justify-center pr-3 bg-gray-50 border-gray-300 group-focus:border-blue-500 border-l-0'>
                {
                    showPassword? <img src='./src/assets/showPassword.svg' className="flex items-center ps-3.5 right-[10px] top-3 w-8 cursor-pointer" onClick={handlerShowPassword}/>:<img src='./src/assets/hidePassword.svg' className="flex items-center ps-3.5 right-[10px] top-3 w-8 cursor-pointer" onClick={handlerShowPassword}/>
                }
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2 relative'>
                <Link to='/forgotPassword' className='text-blue-400 my-2 text-sm'>forgot your password?</Link>
                <button className='bg-blue-500 text-white px-3 py-1 rounded w-[70px] sm:w-[120px]'>Login</button>
            </div>
            <div className='flex gap-1 text-[13px] w-full'>
              <p>Don't have an Account?</p>
              <Link to='/register' className='text-blue-400 underline underline-offset-4'>Create New Account</Link>
            </div>
            
          </div>
        </form>
    </div>
  )
}

export default Login


{/**
<form className="w-full max-w-md border rounded border-gray-300 p-8 px-20 pl-20" onSubmit={onSubmitHandler}>
        <h1 className='flex justify-center mb-6 text-sm sm:text-md'>TODO APP <span className='text-blue-500 font-semibold ml-2'>LOGIN</span></h1>
        <div className="mb-5 w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='email' autoComplete='off' onChange={onChangeHandler} value={state.email} placeholder="Your Email" required />
        </div>
        <div className="mb-5">
            <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='password' onChange={onChangeHandler} value={state.password} placeholder="Your Password" required />
            <Link to={'/forgot-password'} className='block text-sm text-green-400 font-semibold mt-4 ml-auto'>Forgot Password ?</Link>
        </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Login</button>
          <p className='text-sm mt-2'> Don't have an account:<Link to="/register" className='text-blue-400 underline underline-offset-2 text-sm ml-2 hover:text-blue-500 transition-colors'>Create New Account</Link></p>
        </form>
 */}








































{/**
import React, { useState } from 'react'
import Axios from '../utils/Axios'
import { Link, useNavigate } from 'react-router-dom'
import summeryApi from '../common/SummeryApi'

const Login = () => {
  const navigate = useNavigate()
  const [state,setState] = useState({
    email:"",
    password:""
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setState(prev=>({...prev,[name]:value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const response = await Axios({
        ...summeryApi.login,
        data:state
    })
    
      if(response.data.success){
        localStorage.setItem('accessToken',response.data.data.accessToken)
        localStorage.setItem('refreshToken',response.data.data.refreshToken)
        setState({
          email:"",
          password:""
        })
        navigate("/")
      }

    }catch(error){
      console.log("Error")
    }
  }

  

  return (
    <div className='flex w-full items-center justify-center min-h-screen px-4'>
        <form className="w-full max-w-md border rounded border-gray-300 p-8 px-20 pl-20" onSubmit={onSubmitHandler}>
        <h1 className='flex justify-center mb-6'>TODO APP <span className='text-blue-500 font-semibold ml-2'>LOGIN</span></h1>
        <div className="mb-5 w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='email' autoComplete='off' onChange={onChangeHandler} value={state.email} placeholder="Your Email" required />
        </div>
        <div className="mb-5">
            <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='password' onChange={onChangeHandler} value={state.password} placeholder="Your Password" required />
            <Link to={'/forgot-password'} className='block text-sm text-green-400 font-semibold mt-4 ml-auto'>Forgot Password ?</Link>
        </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Login</button>
          <p className='text-sm mt-2'> Don't have an account:<Link to="/register" className='text-blue-400 underline underline-offset-2 text-sm ml-2 hover:text-blue-500 transition-colors'>Create New Account</Link></p>
        </form>
    </div>
  )
}

export default Login
 */}