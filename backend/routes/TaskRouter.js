import express from 'express'
import { addTask } from '../Controllers/TaskController.js'
import { forgot_password, login, logout, refreshToken, register, resetPassword, uploadAvatar, verify_otp } from '../Controllers/UserController.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const taskRoute = express.Router()

taskRoute.post('/add',auth,addTask)
taskRoute.post('/register',register)
taskRoute.post('/login',login)
taskRoute.get('/logout',auth,logout)
taskRoute.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
taskRoute.put('/forgot-password',forgot_password)
taskRoute.put('/verify-otp',verify_otp)
taskRoute.put('/resetPassword',resetPassword)
taskRoute.post('/refreshToken',refreshToken)
export default taskRoute