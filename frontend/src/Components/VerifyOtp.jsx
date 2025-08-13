
import React, { useEffect, useRef, useState } from 'react'
import Axios from '../utils/Axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import summeryApi from '../common/SummeryApi'

const VerifyOtp = () => {
  const [state,setState] = useState(["","","","","",""])
  const navigate = useNavigate()
  const inputRef = useRef([])
  const location = useLocation()
  
  useEffect(()=>{
    if(!location?.state?.email){
      navigate("/forgot-password")
    }
  },[])
  {/** useLocation, useRef */}

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const response = await Axios({
        ...summeryApi.forgot_password_otp_verification,
        data:{
          otp:state.join(""),
          email:location?.state?.email
        }
    })
    
      if(response.data.success){
        setState(["","","","","",""])
        navigate("/reset-password",{
          state:{
            data:response.data,
            email:location?.state?.email
          }
        })

      }

    }catch(error){
      console.log("Error")
    }
  }

  

  return (
    <div className='flex w-full items-center justify-center min-h-screen px-4'>
        <form className="w-full max-w-md border rounded border-gray-300 p-8 px-20 pl-20" onSubmit={onSubmitHandler}>
        <h1 className='flex justify-center mb-6'>Enter <span className='text-blue-500 font-semibold ml-2'>OTP</span></h1>
        <div className="mb-5 w-full">
            
            <div className='flex gap-2 justify-between'>
                {
                    state.map((items,index)=>{
                        return (
                            <input key={"otp"+index}
                            ref={(ref)=>{
                              inputRef.current[index] = ref
                              return ref
                            }}
                             value={state[index]}
                            onChange={(e)=>{
                              const value = e.target.value
                              const newData = [...state]
                              newData[index] = value
                              setState(newData)

                              if(value && index<5){
                                inputRef.current[index+1].focus()
                              }
                            }}
                            type="text" maxLength={1}  className="w-full max-w-16 bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center font-semibold focus:border-amber-200 focus:border-1.5" name='otp' autoComplete='off' required />
                        ) 
                    })
                }
            </div>
        </div>
        <div className='flex flex-col gap-y-2'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Verify OTP</button>
        </div>
        </form>
    </div>
  )
}

export default VerifyOtp