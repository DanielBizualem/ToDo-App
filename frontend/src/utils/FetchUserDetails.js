import Axios from './Axios'
import summeryApi from '../common/SummeryApi'


const fetchUserDetail = async()=>{
    try{
        const response = await Axios({
            ...summeryApi.userDetails
        })
        return response.data
    }catch(error){
        console.log(error)
    }
}

export default fetchUserDetail