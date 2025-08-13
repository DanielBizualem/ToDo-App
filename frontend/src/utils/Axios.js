import axios from "axios"
import { baseURL } from "../common/SummeryApi"

const Axios = axios.create({
    baseURL:baseURL,
    withCredentials:true
})


//sending accessToken to header
Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken){
            config.headers.authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

{/**
Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken){
            config.headers.authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
    
)
 */}

//extend the file span of accessToken with the help of refresh

Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async(error)=>{
        let originRequest = error.config
        if(error.response.status===401 && !originRequest.retry){
            originRequest.retry = true
            const refreshToken = localStorage.getItem('refreshToken')
            if(refreshToken){
                const newAccessToken = await refreshAccessToken(refreshToken)
                if(newAccessToken){
                    return Axios(originRequest)
                }
            }
        }
        return Promise.reject(error)
    }
)



{/**
Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async(error)=>{
         let originRequest = error.config
         if(error.response.status === 401 && !originRequest.retry){
            originRequest.retry = true
            const refreshToken = localStorage.getItem("refreshToken")
            if(refreshToken){
                const newAccessToken = await refreshAccessToken(refreshToken)
                if(newAccessToken){
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originRequest)
                }
            }
         }
         return Promise.reject(error)
    }
)
 */}

const refreshAccessToken = async(refreshToken)=>{
    try{
        const response = await Axios({
            ...summeryApi.refreshToken,
            headers:{
                Authorization: `Bearer ${refreshToken}`
            }
        })
        const accessToken = response.data.data.accessToken
        localStorage.setItem(accessToken)
        return accessToken
    }catch(error){
        console.log(refreshToken)
    }
}

export default Axios












{/**
const refreshAccessToken = async(refreshToken)=>{
    try{
        const response = await Axios({
            ...summerApi.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })
        const accessToken = response.data.data.accessToken
        localStorage.setItem('accessToken',accessToken)
        return accessToken
    }catch(error){
        console.log(error)
    }
}
export default Axios
 */}