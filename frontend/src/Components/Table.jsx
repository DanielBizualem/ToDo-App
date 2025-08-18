import { useEffect, useState } from "react"
import Axios from "../utils/Axios.js"
import summeryApi from "../common/SummeryApi.js"
import { MdDelete } from "react-icons/md";
import InputForm from "./InputForm.jsx";
import ConformBox from "./ConformBox.jsx";

const Table = () => {
    const [userTask,setUserTask] = useState([])
    const [openConfirm,setOpenConfirm] = useState(false)
    const [taskDelete,setTaskDelete] = useState({
        _id:""
    })
    
    const fetchTaskDetails  = async()=>{
        try{
            const response = await Axios({
                ...summeryApi.fetchTask
            })
            if(response.data.success){
                setUserTask(response.data.data)
            }
            return response.data
        }catch(error){
            console.log(error)
        }
    } 

    const handleDeleteTask = async()=>{
        try{
            const response = await Axios({
                ...summeryApi.deleteTask,
                data:taskDelete
            })
            const {data:responseData} = response
            if(responseData.success){
                    fetchTaskDetails()
                    setOpenConfirm(false)
            }
        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(()=>{
        fetchTaskDetails()
    },[])
    
  return (
    <div className="flex w-full">
        <InputForm fetchData={fetchTaskDetails}/>
    <div className='flex flex-col gap-5 mb-10   invisible sm:visible overflow-y-scroll'>
        <div className="relative border mt-4 mx-10 rounded border-gray-300">
            <table className="text-[12px] sm:text-left sm:rtl:text-right text-gray-500 dark:text-gray-400 sm:w-fit md:w-full">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="sm:px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Due date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        userTask.map((item,index)=>{
                        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <p>{item.title}</p>
                                    </th>
                                    <td className="px-6 py-4">
                                        <p>{item.description}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p>{item.date}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p>{item.category}</p>
                                    </td>
                                    <td className="px-6 py-4 justify-center cursor-pointer">
                                    <MdDelete style={{ width: '18px', color:"#8B0000",margin:3, height: 'auto' }} onClick={()=>{setOpenConfirm(true),setTaskDelete(item)}}/>
                                    </td>
                                    </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
    {
        openConfirm?<ConformBox close={()=>setOpenConfirm(false)} cancel={()=>setOpenConfirm(false)} confirm={handleDeleteTask}/>:""
    }
    </div>
  )
}

export default Table




{/**
<div className='flex flex-col gap-5 mb-10 mx-15'>
        <div className="relative border mt-4 rounded border-gray-300">
            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 sm:w-fit md:w-full">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Task Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Due date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           <p>{userTask.title}</p>
                        </th>
                        <td className="px-6 py-4">
                            White
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
 */}


 {/**
 {
            userTask.map((item,index)=>{
                return <div key={index}>
                    <p>{item.title}</p>
                </div>
        })
        }
 */}