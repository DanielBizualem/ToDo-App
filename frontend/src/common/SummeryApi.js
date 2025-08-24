export const baseURL = "http://localhost:4000"

const summeryApi = {
    register:{
        url:'/api/todo/register',
        method:"post"
    },
    login:{
        url:'api/todo/login',
        method:"post"
    },
    forgot_password:{
        url:"api/todo/forgot-password",
        method:"put"
    },
    forgot_password_otp_verification:{
        url:"api/todo/verify-otp",
        method:"put"
    },
    resetPassword:{
        url:"/api/todo/resetPassword",
        method:'put'
    },
    refreshToken:{
        url:"/api/todo/refreshToken",
        method:"post"
    },
    userDetails:{
        url:"api/todo/userDetail",
        method:"get"
    },
    logout:{
        url:"api/todo/logout",
        method:"get"
    },
    updateUser:{
        url:"api/todo/updateUser",
        method:"put"
    },
    addTask:{
        url:"api/todo/add",
        method:"post"
    },
    fetchTask:{
        url:"api/todo/fetchTask",
        method:"get"
    },
    uploadAvatar:{
        url:"api/todo/upload-avatar",
        method:"put"
    },
    deleteTask:{
        url:"api/todo/remove",
        method:"put"
    }
}

export default summeryApi