import express from 'express'
import { addTask } from '../Controllers/TaskController.js'
import { login, logout, register, uploadAvatar } from '../Controllers/UserController.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const taskRoute = express.Router()

taskRoute.post('/add',addTask)
taskRoute.post('/register',register)
taskRoute.post('/login',login)
taskRoute.get('/logout',auth,logout)
taskRoute.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
export default taskRoute