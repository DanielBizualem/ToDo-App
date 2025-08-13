import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchUserDetail from '../utils/FetchUserDetails';
import { setUserDetails } from '../store/useSlice'
import UserMenu from './UserMenu';
import Saved from './Saved';

 // Create this component

const Dashboard = () => {
  const dispatch = useDispatch()
  const [active,setActive] = useState(false)
  const user = useSelector((state)=>state?.user)
  //console.log('user from store',user)
  

  const fetchUser = async()=>{
    const userData = await fetchUserDetail()
    dispatch(setUserDetails(userData.data))
    console.log('userData',userData)
  }

  useEffect(()=>{
    fetchUser()
  },[])

  const onClickHandler = ()=>{
    setActive(true)
    console.log(active)
  }

  return (
    <div className='flex flex-col'>
    <div className='flex justify-between border-b w-[full] h-[75px] shadow-sm border-gray-300'>
      <div className='flex ml-5 items-center'>Logo</div>
      <div className='relative group flex flex-col gap-x-3 mr-5 items-center'>
        <div>
        {
          user._id?<div className='flex flex-col sm:flex-row mt-2 text-sm sm:mt-5 mr-5 gap-x-2'>
            <img src={user.avatar} className='w-10 rounded-full'/>
            <p>{user.firstname}</p>
          </div>:""
        }
        </div>

        <div className='absolute right-5 sm:right-18 top-18 shadow-sm invisible group-hover:visible transition-opacity duration-500'>
          <div className='bg-gray-100 rounded p-4 min-w-45 text-md'>
            <UserMenu/>
          </div>
        </div>
      </div>
    </div>
    <div className='flex h-[518px]'>
      
      <div className='flex flex-col w-[20%] border-r shadow-sm border-gray-300 justify-between'>
        <div className='flex mt-15 w-full'>
          <ul className='flex flex-col text-gray-600 font-semibold w-full text-sm'>
            <div className={`flex border-b w-full px-4 py-2 list-none border-gray-300 pt-4 hover:bg-gray-100 rounded text-md gap-x-2 ${active?'bg-gray-100 w-full px-4 py-2':''}`}><img src="./src/assets/dashboard.svg" alt="" onClick={onClickHandler}/><li className={`hidden md:block`}>Dashboard</li></div>
            <div className='flex border-b w-full px-4 py-2 list-none border-gray-300 pt-4 hover:bg-gray-100 rounded text-md gap-x-2'><img src="./src/assets/checklist(1).png" alt="" className='w-6'/><li className='hidden md:block'>Activity</li></div>
            <div className='flex border-b w-full px-4 py-2 list-none border-gray-300 pt-4 hover:bg-gray-100 rounded text-md gap-x-2'><img src="./src/assets/analytics.png" className='w-6' alt="" /><li className='hidden md:block'>Analytics</li></div>
            <div className='flex border-b w-full px-4 py-2 list-none border-gray-300 pt-4 hover:bg-gray-100 rounded text-md gap-x-2'><img src="./src/assets/history.png" className='w-6' alt="" /><li className='hidden md:block'>History</li></div>
            <div className='flex border-b w-full px-4 py-2 list-none border-gray-300 pt-4 hover:bg-gray-100 rounded text-md gap-x-2'><img src="./src/assets/setting.png" className='w-6' alt="" /><li className='hidden md:block'>Setting</li></div>
            
          </ul>
        </div>
        <div className='flex flex-col justify-center border-t border-gray-300 text-gray-500 text-[12px] mb-2 items-center gap-x-1'>
            <p>Adama City Administration</p>
            <p>All Rights Reserved</p> 
        </div>

      </div>
      
      <div className='w-full overflow-y-scroll justify-center items-center'>
        <div className='w-[50%]'>
          

<div class="relative mb-6">
    <label for="labels-range-input" class="sr-only">Labels range</label>
    <input id="labels-range-input" type="range"  min="100" max="1500" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
    <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min ($100)</span>
    <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">$500</span>
    <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">$1000</span>
    <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max ($1500)</span>
</div>


        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
