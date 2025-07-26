import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Axios from '../utils/Axios'
import summeryApi from '../common/SummeryApi'
const Register = () => {
    const [state,setState] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })

    const onChangeHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setState(prev=>({...prev,[name]:value}))
    }

    {/**const valideValue = Object.values(data).every(el=>el) */}

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        {/**const response = await axios.post('http://localhost:4000/api/todo/register',state) */}
        try{
            const response = await Axios({
                ...summeryApi.register,
                data:state
            })
        if(response.data.success){
            setState({
                firstname:"",
                lastname:"",
                email:"",
                password:""
            })
        }
        }catch(error){
            console.error(error)
        }
            
    }

  return (
    <div className='flex w-full items-center justify-center min-h-screen px-4'>
        <form className="flex flex-col w-full max-w-md justify-center items-center rounded border-gray-300 p-8 px-20 pl-20" onSubmit={onSubmitHandler}>
        <h1 className='flex justify-center mb-6'>TODO APP <span className='text-blue-500 ml-2 font-semibold'>REGISTER</span></h1>
        <div className='flex flex-col gap-x-5'>
            <div>
                <div className="mb-5 w-full">
                    <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                    <input type="text" onChange={onChangeHandler} className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='firstname' value={state.firstname} placeholder="Your First name" required />
                </div>
                <div className="mb-5">
                    <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                    <input type="text" onChange={onChangeHandler} className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='lastname' value={state.lastname} placeholder="Your Last name" required />
                </div>
            </div>
            <div>
                <div className="mb-5">
                    <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" onChange={onChangeHandler} className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='email' value={state.email} placeholder="Your Email" required />
                </div>
                <div className="mb-5">
                    <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" onChange={onChangeHandler} className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='password' value={state.password} placeholder="Your Password" required />
                </div>
            </div>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Register</button>
        <p className='text-sm mt-2'>Already have an account:<Link to="/login" className='text-blue-400 underline underline-offset-2 text-sm ml-2 hover:text-blue-500 transition-colors'>Login</Link></p>
        </form>
    </div>
  )
}

export default Register