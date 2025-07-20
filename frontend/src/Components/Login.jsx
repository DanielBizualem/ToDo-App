import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const Login = () => {
  const [state,setState] = useState({
    email:"",
    password:""
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setState(prev=>({...prev,[name]:value}))
  }

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    const response = await axios.post('http://localhost:4000/api/todo/login',state)
    if(response.data.success){
      setState({
        email:"",
        password:""
      })
    }
  }

  return (
    <div className='flex w-full items-center justify-center min-h-screen px-4'>
        <form className="w-full max-w-md border rounded border-gray-300 p-8 px-20 pl-20" onSubmit={onSubmitHandler}>
        <h1 className='flex justify-center mb-6'>TODO APP <span className='text-blue-500 font-semibold ml-2'>LOGIN</span></h1>
        <div className="mb-5 w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='email' onChange={onChangeHandler} value={state.email} placeholder="Your Email" required />
        </div>
        <div className="mb-5">
            <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='password' onChange={onChangeHandler} value={state.password} placeholder="Your Password" required />
        </div>
        
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Login</button>
           <p className='text-sm mt-2'> Don't have an account:<Link to="/register" className='text-blue-400 underline underline-offset-2 text-sm ml-2 hover:text-blue-500 transition-colors'>Create New Account</Link></p>
        
        </form>
    </div>
  )
}

export default Login