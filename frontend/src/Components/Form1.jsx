import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import summeryApi from '../common/SummeryApi.js'
import Table from './Table.jsx'
import MobileTable from './MobileTable.jsx'
import UserMenu from './UserMenu.jsx'
import { useDispatch, useSelector } from 'react-redux'
import fetchUserDetail from '../utils/FetchUserDetails.js'
import { setUserDetails } from '../store/useSlice.js'
import InputForm from './InputForm.jsx'

const Form1 = () => {
  const dispatch = useDispatch()
  const user = useSelector((state)=>state?.user)
  const [control,setControl] = useState(true)
  const [icon,setIcon] = useState(false)

  const fetchUser = async()=>{
    const userData = await fetchUserDetail()
    dispatch(setUserDetails(userData.data))
  }
  useEffect(()=>{
    fetchUser()
  },[])
  const onChangeControl = ()=>{
    setControl(!control)
  }

  useEffect(()=>{
    const handleClick = ()=>{
      setIcon(false)
    }
    document.addEventListener('click',handleClick)

    return ()=>{
    document.removeEventListener('click',handleClick)
  }
  },[])
  const handleProfileClick = (e) => {
    e.stopPropagation(); // Prevents the document click from firing
    setIcon(!icon);
  }
  
  

  const avatar = user?.firstname?.charAt(0)?.toUpperCase()
  const avatar2 = user?.lastname?.charAt(0)?.toUpperCase()
  

  return (
    <div className='sm:w-full sm:flex sm:flex-col gap-2 items-center justify-between sm:min-h-screen'>
      <div className='flex justify-between border-b border-gray-400 w-full py-5 px-4 shadow-sm'>
        <div className='flex gap-x-1'>
          <img src="./src/assets/checklist.png" alt="" className='sm:w-7 w-6'/>
          <p className='flex sm:text-lg font-semibold'>ToDo <span className='text-blue-500 ml-1'>App</span></p>
        </div>
        <div className='flex relative group'>
            {
              user._id?<div className='flex flex-col sm:flex-row text-sm  mr-5 gap-x-2'>
                {user.avatar?<img src={user.avatar} className='w-10 h-10 rounded-full cursor-pointer' onClick={handleProfileClick}/>:
                <div className='flex bg-gray-100 w-10 h-10 items-center justify-center rounded-full cursor-pointer' onClick={handleProfileClick}>
                  <p className='text-pink-500 text-md'>{avatar}</p>
                  <p className='text-pink-500 text-md'>{avatar2}</p>
                </div>
              }
                <p>{user.firstname}</p>
              </div>:<div className='flex gap-x-2'>
                <a href='/login' className='flex items-center bg-gradient-to-r from-blue-400 to-blue-300  rounded outline-none px-4 text-black/70'>Login</a>
                <a href='/register' className='flex items-center bg-gradient-to-r from-blue-400 to-blue-300  rounded outline-none px-4 text-black/70'>SignUp</a>
              </div>
            }
              <div className={`absolute right-5 sm:right-30 top-10 shadow-sm ${icon?'visible':'invisible'}  transition-opacity duration-500 z-1`}>
                <div className='bg-gray-100 rounded p-4 min-w-45 text-md'>
                    <UserMenu/>
                </div>
              </div>
        </div>
      </div>
      <div className='sm:flex border px-3 border-gray-300 rounded text-gray-500'>
      
      <div className='w-full  border-b sm:border-none py-2 bg-blue-400 text-white rounded sm:hidden flex'>
            <button className='flex text-right text-sm hover:text-black px-2 py-1 rounded bg-red-400 text-white sm:invisible mr-2 ml-2 font-semibold' onClick={onChangeControl}>{control?'My Tasks':'Add Tasks'}</button>
        </div>
        <div>
          {
            control?'':<MobileTable/>
          }
        </div>
       <div className='flex overflow-y-scroll h-[360px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          <Table/>
       </div>
      </div>
      <p className='flex text-sm sm:w-full justify-center py-2 border-t border-gray-400 bg-black/85 text-white'>Developed by Daniel Bizualem @2025</p>
    </div>
  )
}

export default Form1

{/**

<form className="md:max-w-md md:mx-auto sm:ml-20" onSubmit={onSubmitHandler}>
        <div className="relative z-0  mb-5 group">
            <input type="text" name="title" onChange={onChangeHandler} id="floating_email" value={task.title} className="block py-2.5 px-0 sm:w-[190px] md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Task Title</label>
        </div>
        <div className="relative z-0 mb-5 group">
            <input type="text" name="description" onChange={onChangeHandler} id="floating_password" value={task.description} className="block py-2.5 px-0 sm:w-[190px] md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
        </div>
        <div className="relative z-0 mb-5 group">
            <input type="date" name="date" onChange={onChangeHandler} id="floating_repeat_password" value={task.data} className="block py-2.5 px-0 sm:w-[190px] md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Due date</label>
        </div>
        <div className="relative z-0 mb-5 group">
            <select className="block py-2.5 px-0 sm:w-[190px] md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer my-2" onChange={onChangeHandler} name='category' value={task.category||''}>
              <option value="" disabled>Select Category</option>
              <option className='flex ml-2' value='Meeting'>Meeting</option>
              <option value='work'>Work</option>
              <option value='travel'>Travel</option>
              <option value='others'>Others</option>
            </select>
            <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
        </div>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
      </form>
 */}