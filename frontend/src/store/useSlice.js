
import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id:"",
    firstname:"",
    email:"",
    lastname:"",
    avatar:"",
    refresh_token:"",
    last_login_date:"",
}

const userSlice = createSlice({
    name:'User',
    initialState:initialValue,
    reducers:{
        setUserDetails:(state,action)=>{
            state.firstname = action.payload.firstname
            state.email = action.payload.email
            state.lastname = action.payload.lastname
            state.avatar = action.payload.avatar
            state.refresh_token = action.payload.refresh_token
            state.last_login_date = action.payload.last_login_date
            state._id = action.payload._id
        },
        logout:(state,action)=>{
            state.firstname = ""
            state.email = ""
            state.lastname = ""
            state.avatar = ""
            state.refresh_token = ""
            state.last_login_date = ""
            state._id = ""
        }
    }
})

export const { setUserDetails, logout} = userSlice.actions

export default userSlice.reducer
