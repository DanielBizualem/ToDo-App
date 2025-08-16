import express from 'express'
import { addTask, fetchTask, removeItem, uploadImage } from '../Controllers/TaskController.js'
import { forgot_password, login, logout, refreshToken, register, resetPassword, updateUserDetails, uploadAvatar, userDetail, verify_otp } from '../Controllers/UserController.js'
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
taskRoute.get('/userDetail',auth,userDetail)
taskRoute.put('/updateUser',auth,updateUserDetails)
taskRoute.get('/fetchTask',auth,fetchTask)
taskRoute.post('/uploadImage',auth,upload.single("image"),uploadImage)
taskRoute.put('/remove',auth,removeItem)
export default taskRoute