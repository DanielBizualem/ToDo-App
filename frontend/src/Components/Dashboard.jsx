import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; // Create this component

const Dashboard = () => {
  return (
    <div className='flex flex-col'>
    <div className='flex justify-between border-b w-[full] h-[75px] shadow-sm border-gray-300'>
      <div className='flex ml-5 items-center'>Logo</div>
      <div className='flex gap-x-3 mr-5 items-center'>
            <div className='flex w-full px-4 py-2 list-none border-gray-300 pt-4 rounded text-md gap-x-1'><img src="./src/assets/profile.svg" alt="" /><li className='hidden md:block mb-2'>Daniel</li></div>
            <div></div>
      </div>
    </div>
    <div className='flex h-[518px]'>
      
      <div className='flex flex-col w-[20%] border-r shadow-sm border-gray-300 justify-between'>
        <div className='flex mt-15 w-full'>
          <ul className='flex flex-col text-gray-600 font-semibold w-full text-sm'>
            <div className='flex border-b w-full px-4 py-2 list-none border-gray-300 pt-4 hover:bg-gray-100 rounded text-md gap-x-2'><img src="./src/assets/dashboard.svg" alt="" /><li className='hidden md:block'>Dashboard</li></div>
            <div className='flex border-b w-full px-4 py-2 list-none border-gray-300 pt-4 hover:bg-gray-100 rounded text-md gap-x-2'><img src="./src/assets/checklist(1).png" alt="" className='w-6'/><li className='hidden md:block'>Activity</li></div>
            <div className='flex border-b w-full px-4 py-2 list-none border-gray-300 pt-4 hover:bg-gray-100 rounded text-md gap-x-2'><img src="./src/assets/analytics.png" className='w-6' alt="" /><li className='hidden md:block'>Analytics</li></div>
            <div className='flex border-b w-full px-4 py-2 list-none border-gray-300 pt-4 hover:bg-gray-100 rounded text-md gap-x-2'><img src="./src/assets/history.png" className='w-6' alt="" /><li className='hidden md:block'>History</li></div>
            <div className='flex border-b w-full px-4 py-2 list-none border-gray-300 pt-4 hover:bg-gray-100 rounded text-md gap-x-2'><img src="./src/assets/setting.png" className='w-6' alt="" /><li className='hidden md:block'>Setting</li></div>
            
          </ul>
        </div>
        <div className='flex flex-col justify-center border-t border-gray-300 text-gray-500 text-[12px] mb-2 items-center gap-x-1'>
            <p>©Adama City Administration</p>
            <p>All Rights Reserved</p> 
        </div>

      </div>
      
      <div className='w-full overflow-y-scroll'>
        
      </div>
    </div>
    </div>
  );
};

export default Dashboard;