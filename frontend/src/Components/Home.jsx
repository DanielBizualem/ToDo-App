import React from 'react'
import Form1 from './Form1'
import Table from './Table'
import Title from './Title'
import Profile from './Profile'
import Footer from './Footer'


const Home = () => {
  return (
    <div>
        <Profile/>
        <Title/>
        <Form1/>
        <Table/>
    </div>
  )
}

export default Home


{/**
className='flex flex-col'
<Profile/>
        <Title/>
        <div className='flex flex-col justify-between  gap-y-4 md:mx-25'>
            <Form1/>
            <Table/>
        </div>
        <Footer/>

 */}