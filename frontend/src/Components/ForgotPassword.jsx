
import React, { useState } from 'react'
import Axios from '../utils/Axios'
import { Link, useNavigate } from 'react-router-dom'
import summeryApi from '../common/SummeryApi'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [state,setState] = useState({
    email:"",
  })

  const onChangeHandler = (e)=>{
    const {name,value} = e.target
    setState(prev=>({...prev,[name]:value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const response = await Axios({
        ...summeryApi.forgot_password,
        data:state
    })
    
      if(response.data.success){
        navigate("/verify-otp",{
          state:state
        })
        setState({
          email:"",
        })
      }

    }catch(error){
      console.log("Error")
    }
  }

  

  return (
    <div className='flex w-full items-center justify-center min-h-screen px-4 bg-gray-100'>
        <form className="w-full max-w-md border rounded border-gray-300 p-8 px-20 pl-20 bg-white" onSubmit={onSubmitHandler}>
        <h1 className='flex justify-center mb-6'>Verification By <span className='text-blue-500 font-semibold ml-2'>Email</span></h1>
        <div className="mb-5 w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='email' autoComplete='off' onChange={onChangeHandler} value={state.email} placeholder="Enter Your Email" required />
        </div>
        <div className='flex flex-col gap-y-2'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Send OTP</button>
        </div>
        </form>
    </div>
  )
}

export default ForgotPassword