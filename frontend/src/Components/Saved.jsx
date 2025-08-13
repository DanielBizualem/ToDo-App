import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchUserDetail from '../utils/FetchUserDetails'
import { setUserDetails } from '../store/useSlice'

const Saved = () => {
    const dispatch = useDispatch()
    const user = useSelector((state)=>state?.user)
    console.log('user from saved',user)

    const fetchUser = async()=>{
        const userData = await fetchUserDetail()
        dispatch(setUserDetails(userData.data))
        console.log('userData',userData)
      }
    
      useEffect(()=>{
        fetchUser()
      },[])
  return (
    <div>
        {user.posts}
    </div>
  )
}

export default Saved