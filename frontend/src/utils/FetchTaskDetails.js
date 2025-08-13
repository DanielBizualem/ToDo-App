import Axios from "./Axios"
import summeryApi from "../common/SummeryApi.js"

const fetchTaskDetails  = async()=>{
    try{
        const response = await Axios({
            ...summeryApi.fetchTask
        })
        return response.data.data
    }catch(error){
        console.log(error)
    }
}

export default fetchTaskDetails