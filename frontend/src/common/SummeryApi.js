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
    forgot_password_otp:{
        url:"api/todo/forgot-password",
        method:"put"
    }
    
}

export default summeryApi