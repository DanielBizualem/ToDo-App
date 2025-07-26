const forgotPasswordTemplate = ({name,otp})=>{
    return `
        <p>Dear ${name}</p>
        <p>You are requested to reset your password. Please follow these OTP to reset your password</p>
        <div style=""background:yellow; font-size:20px;>
            ${otp}
        </div>
    `
}
export default forgotPasswordTemplate