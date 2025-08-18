import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import summeryApi from '../common/SummeryApi'
const InputForm = ({fetchData}) => {
    //const [control,setControl] = useState(true)
    const [task,setTask] = useState({
        title:"",
        description:"",
        date:null,
        category:""
      })
      {/**
      const onChangeControl = ()=>{
        setControl(!control)
      }
     */}
    const onChangeHandler = (e)=>{
        const {name,value} = e.target
        setTask(prev=>({...prev,[name]:value}))
        //({...prev,[name]:value})
        console.log(task)
      }

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        const response = await Axios({
          ...summeryApi.addTask,
          data:task
        })
        if(response.data.success){
          setTask({
            title:"",
            description:"",
            date:null,
            category:""
          })
          fetchData()
        }
      }

  return (
    <div className='ml-2 sm:border-r px-6 py-5 border-gray-400 h-[370px]'>
        <form onSubmit={onSubmitHandler} className={`flex flex-col gap-y-3`}>
          <div className='flex flex-col text-sm gap-y-1'>
            <p>Title:</p>
            <input type="text" name="title" onChange={onChangeHandler} id="floating_email" value={task.title} className='border border-gray-400 px-2 py-1.5 outline-none hover:border-blue-400 rounded sm:w-[230px]' placeholder="Enter a title" required />
          </div>
          <div className='flex flex-col text-sm gap-y-1'>
            <p>Description:</p>
            <input type="text" name='description' onChange={onChangeHandler}  value={task.description}  className='border border-gray-400 px-2 py-1.5 outline-none hover:border-blue-400 rounded' placeholder='Enter a Description' autoComplete='off'/>
          </div>
          <div className='flex flex-col text-sm gap-y-1'>
            <p>Date:</p>
            <input type="date" name='date' onChange={onChangeHandler} value={task.date}  className='border border-gray-400 px-2 py-1.5 outline-none hover:border-blue-400 rounded' placeholder='Enter a Date' autoComplete='off'/>
          </div>
          <div className='flex flex-col text-sm gap-y-1'>
            <p>Category:</p>
            <select name="category" className='border border-gray-400 px-2 py-1.5 outline-none hover:border-blue-400 rounded' onChange={onChangeHandler} value={task.value}>
              <option disabled value="category">Select a Category</option>
              <option value="meeting">Meeting</option>
              <option value="work">Work</option>
              <option value="travel">Travel</option>
              <option value="sport">Sport</option>
              <option value="walking">Walking</option>
              <option value="learning">Learning</option>
              <option value="Group Event">Group Events</option>
              <option value="Religious">Religious</option>
            </select>
          </div>
          <button type='submit' className='sm:px-4 sm:py-2 px-2 py-1 outline-none rounded bg-blue-500 text-white hover:bg-blue-600'>Add Task</button>
        </form>
        
        
      </div>
  )
}

export default InputForm