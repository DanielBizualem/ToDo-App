import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import summeryApi from '../common/SummeryApi'

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data,setData] = useState({
        email:"",
        newPassword:"",
        confirmPassword:""
    })
    useEffect(()=>{
        if(!(location?.state?.data?.success)){
            navigate("/")
        }
        if(location?.state?.email){
            setData((prev)=>{
                return {
                    ...prev,
                    email:location?.state?.email
                }
            })
        }
    },[])

    const onChangeHandler = (e)=>{
        const {name,value} = e.target
        setData(prev=>({...prev,[name]:value}))
      }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(data.newPassword!==data.confirmPassword){
            console.log('Password not match')
            return
        }
        try{
          const response = await Axios({
            ...summeryApi.resetPassword,
            data:data
        })
        
          if(response.data.success){
            navigate("/login")
            setData({
                email:"",
                newPassword:"",
                confirmPassword:""
            })
          }
    
        }catch(error){
          console.log("Error")
        }
      }
  return (
    <div className='flex w-full items-center justify-center min-h-screen px-4'>
        <form className="w-full max-w-md border rounded border-gray-300 p-8 px-20 pl-20" onSubmit={onSubmitHandler}>
        <h1 className='flex justify-center mb-6'>Reset <span className='text-blue-500 font-semibold ml-2'>Password</span></h1>
        <div className="mb-5 w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
            <input type="password" className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='newPassword' autoComplete='off' onChange={onChangeHandler} value={data.newPassword} placeholder="Enter Your Email" required />
        </div>
        <div className="mb-5 w-full">
            <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
            <input type="password" className="w-[330px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='confirmPassword' autoComplete='off' onChange={onChangeHandler} value={data.confirmPassword} placeholder="Enter Your Email" required />
        </div>
        <div className='flex flex-col gap-y-2'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Change Password</button>
        </div>
        </form>
    </div>
  )
}

export default ResetPassword