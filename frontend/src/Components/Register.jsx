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
    <div className='flex flex-col w-full items-center justify-center min-h-screen px-4 bg-gray-50'>
        <p className='flex sm:text-xl mb-3 font-semibold gap-1 my-6'>TODO<span className=' text-blue-500'>Registration</span></p>
        <form className='border border-gray-300 rounded p-4 w-[230px] sm:w-[480px] gap-3 bg-white'>
            <div className='flex flex-col sm:flex-row sm:gap-8'>
            <div className='flex flex-col text-gray-500 gap-2'>
                <p>First Name:</p>
                <input type="text" className='border border-gray-400 px-2 py-1 rounded outline-none hover:border-blue-500' autoComplete='off' value={state.firstname} name='firstname'/>
            </div>
            <div className='flex flex-col text-gray-500 gap-2'>
                <p>Last Name:</p>
                <input type="text" className='border border-gray-400 px-2 py-1 rounded outline-none hover:border-blue-500' value={state.lastname} autoComplete='off' name='lastname'/>
            </div>
            </div>
            <div className='flex flex-col my-3 text-gray-500'>
                <p>Gender</p>
                <select name="" className='border border-gray-400 px-2 py-1 rounded outline-none hover:border-blue-500 w-[200px]'>
                    <option value="selectCategory" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className='flex flex-col text-gray-500 gap-2'>
                <p>Email:</p>
                <input type="email" className='border border-gray-400 px-2 py-1 rounded outline-none hover:border-blue-500 sm:w-[430px]' value={state.email} autoComplete='off' name='email'/>
            </div>
            <div className='flex flex-col text-gray-500 gap-2'>
                <p>Password:</p>
                <input type='password' className='border border-gray-400 px-2 py-1 rounded outline-none hover:border-blue-500 sm:w-[430px]' value={state.password} autoComplete='off' name='password'/>
            </div>
            <div className='flex flex-col text-gray-500 gap-2'>
                <p>Confirm Password:</p>
                <input type="password" className='border border-gray-400 px-2 py-1 rounded outline-none hover:border-blue-500 sm:w-[430px]' autoComplete='off' name='password'/>
            </div>
            <button className='flex outline-none bg-blue-500 text-white rounded px-4 py-1 mt-3'>Register</button>
            <Link to='/login' className='text-[13px] text-blue-400 underline underline-offset-4'>Already have an account</Link>
        </form>
    </div>
  )
}

export default Register




{/**

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
 */}