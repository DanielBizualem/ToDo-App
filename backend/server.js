import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'; 
import taskRoute from './routes/TaskRouter.js'
import 'dotenv/config'
const app = express()
const port = 4000


app.use(express.json())
app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL
}))
app.use(cookieParser());

connectDB()

app.use('/api/todo',taskRoute)

app.get("/",(req,res)=>{
    res.send('Hello world')
})

app.listen(port,()=>console.log(`Server running on port http://localhost:${port}`))