import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [login,setLogin] = useState(true)
  return (
    <div className='flex w-full border-b mb-10 mt-3 items-center'>
        <div className='flex ml-10 gap-x-1'>
            <img src="./src/assets/checklist.png" alt="" className='w-8'/>
            <h1 className='flex text-xl font-medium  mb-3'>ToDo <span className='text-xl text-blue-600 ml-1'>App</span></h1>
        </div>
        <div className='flex w-full justify-end mr-5 mb-3'>
            {
                login?
                <div className='relative group'>
                <div className='flex'>
                    <img src="../src/assets/profile.svg" alt="" className='flex focus:outline-none mr-3 cursor-pointer hover:bg-gray-200'/>
                    <div className='flex flex-col gap-0'>
                        <p>First Name</p>
                        <p>Date</p>
                    </div>
                </div>
                <div className='absolute flex right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-1 justify-center py-3'>
                    <ul className='flex flex-col'>
                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:w-full">Dashboard</a>
                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">History</a>
                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Setting</a>
                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</a>
                    </ul>
                </div>
            </div>
                :
                <div className='flex gap-x-3'>
                    <Link to='/register'>SignUp</Link>
                    <Link to='/login'>Login</Link>
                </div>
            }
            
            {/**
             * <div className='relative group'>
                <div className='flex'>
                    <img src="../src/assets/profile.svg" alt="" className='flex focus:outline-none mr-3 cursor-pointer hover:bg-gray-200'/>
                    <div className='flex flex-col gap-0'>
                        <p>First Name</p>
                        <p>Date</p>
                    </div>
                </div>
                <div className='absolute flex right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-1 justify-center py-3'>
                    <ul className='flex flex-col'>
                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:w-full">Dashboard</a>
                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">History</a>
                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Setting</a>
                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</a>
                    </ul>
                </div>
            </div>
             */}
        </div>
    </div>
  )
}

export default Profile