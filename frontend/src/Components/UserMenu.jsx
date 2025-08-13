import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import summeryApi from '../common/SummeryApi'
import { logout } from '../store/useSlice'

const UserMenu = () => {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [editProfile,setEditProfile] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async()=>{
      try{
        const response = await Axios({
          ...summeryApi.logout
        })
        if(response.data.success){
          dispatch(logout())
          localStorage.clear()
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          navigate('/login')
        }
        
      }catch(error){
        console.log(error)
      }
    }

    const handleClick = () => {
      setEditProfile(true)
    }

  return (
    <div className='text-neutral-600 text-sm gap-y-15'>
        <div className='flex justify-between font-semibold text-black'>
          <p>My Account</p>
          <img src="./src/assets/edit.svg" alt="" className='w-5 cursor-pointer' onClick={handleClick}/>
        </div>
        <div className='text-neutral-700 text-sm hover:text-black'>{user.firstname+" "+user.lastname}</div>
        <Divider/>
        <button className='mt-2 text-center font-semibold bg-blue-100 w-full py-2 pl-2 rounded hover:bg-blue-200' onClick={handleLogout}>Logout</button>
        {
          editProfile?navigate('/editProfile'):""
        }
    </div>
  )
}

export default UserMenu