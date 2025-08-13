import React, { useEffect, useState } from 'react'
import summeryApi from '../common/SummeryApi'
import Axios from '../utils/Axios'
import { useDispatch, useSelector } from 'react-redux'
import fetchUserDetail from '../utils/FetchUserDetails'
import { setUserDetails } from '../store/useSlice'
import uploadAvatar from '../utils/uploadAvatar'

const EditProfile = () => {
    const dispatch = useDispatch()
    const [userDetail,setUserDetail] = useState({
        avatar:"",
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })
    const [data,setData] = useState({
        name:"",
        image:""
    })

    const user = useSelector((state)=>state?.user)
    const fetchUser = async()=>{
        const userData = await fetchUserDetail()
        dispatch(setUserDetails(userData.data))
      }
    
      useEffect(()=>{
        fetchUser()
      },[])

    const onChangeHandler = (e)=>{
        const {name,value} = e.target
        setUserDetail(prev=>({...prev,[name]:value}))
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        const response = await Axios({
            ...summeryApi.updateUser,
            data:userDetail
        })
        if(response.data.success){
            setUserDetail({
                firstname:"",
                lastname:"",
                email:"",
                password:""
            })
        }
    }

    const avatar = user?.firstname?.charAt(0)?.toUpperCase()
    const avatar2 = user?.lastname?.charAt(0)?.toUpperCase()

    const handleProfileClick = (e) => {
        e.stopPropagation(); // Prevents the document click from firing
        setIcon(!icon);
      }
    const handleUploadProfile = async(e)=>{
        const file = e.target.files[0]
        if(!file){
            return
        }
        const response = await uploadAvatar(file)
        console.log(response)
        const {data:imageResponse} = response
        setData((prev)=>{
            return{ 
                ...prev,
                image:imageResponse.data.url
            }
        })
        console.log(imageResponse.data.url)

    }

  return (
    <div className='flex w-full min-h-screen items-center justify-center bg-[#f3f3fe] pt-5'>
        <div className='w-[90%] sm:w-[50%] py-3 border rounded border-gray-300 text-gray-600 gap-3 bg-white'>
            <h2 className='text-center mb-5 font-semibold'>Edit Your Profile</h2>
            <form className='flex flex-col items-center w-[80%] sm:w-full gap-3 text-sm' onSubmit={onSubmitHandler}>
                <div className='flex mb-4'>
                    {
                        user.avatar?<div className='flex flex-col gap-y-1'>
                            <img src={user.avatar} alt="" className='w-20 rounded-full'/>
                            <div>
                                <label htmlFor="uploadProfilePhoto">
                                    <div className='text-blue-400 font-semibold hover:text-blue-600'>Update Profile</div>
                                    <input type="file" id='uploadProfilePhoto' className='hidden' onChange={handleUploadProfile}/>
                                </label>
                            </div>
                        </div>:
                        <div className='flex flex-col gap-y-2' >
                            <div className='flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full cursor-pointer' onClick={handleProfileClick}>
                                <p className='text-pink-500 text-lg'>{avatar}</p>
                                <p className='text-pink-500 text-lg'>{avatar2}</p>
                            </div>
                            <div>
                                <label htmlFor="uploadProfilePhoto">
                                    <div className='text-blue-400 font-semibold hover:text-blue-600'>Update Profile</div>
                                    <input type="file" id='uploadProfilePhoto' className='hidden' onChange={handleUploadProfile}/>
                                </label>
                            </div>
                        </div>
                    }
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='flex text-left mr-25 sm:mr-35'>First Name:</p>
                    <input type="text" autoComplete='off' placeholder={user.firstname} name='firstname' value={userDetail.firstname} onChange={onChangeHandler} className='flex ml-10 border px-2 py-2 rounded bg-blue-50 border-gray-300 outline-none hover:border-blue-500 sm:w-[250px] w-[210px]'/>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='flex text-left mr-25 sm:mr-35'>Last Name:</p>
                    <input type="text" autoComplete='off' placeholder={user.lastname} name='lastname' value={userDetail.lastname} onChange={onChangeHandler} className='border bg-blue-50 w-[210px] ml-10 px-2 py-2 rounded border-gray-300 outline-none hover:border-blue-500 sm:w-[250px]'/>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='flex text-left mr-32 sm:mr-43'>Email:</p>
                    <input type="email" autoComplete='off' placeholder={user.email} name='email' value={userDetail.email} onChange={onChangeHandler} className='border w-[210px] ml-10 px-2 py-2 rounded border-gray-300 outline-none hover:border-blue-500 sm:w-[250px] bg-blue-50'/>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='flex text-left mr-25 sm:mr-37'>Password:</p>
                    <input type="password"  placeholder="password" name='password' value={userDetail.password} onChange={onChangeHandler} className='border ml-10 w-[210px] px-2 py-2 rounded border-gray-300 outline-none hover:border-blue-500 sm:w-[250px] bg-blue-50'/>
                </div>
                <button type='submit' className='max-w-[120px] sm:ml-10 hover:bg-blue-600 cursor-pointer bg-blue-500 text-white rounded px-3 py-2 my-3'>Change</button>
            </form>
        </div>
    </div>
  )
}

export default EditProfile