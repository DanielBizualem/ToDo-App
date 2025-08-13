import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; // Create this component
import Dashboard from '../src/Components/Dashboard'
import ForgotPassword from './Components/ForgotPassword';
import VerifyOtp from './Components/VerifyOtp';
import ResetPassword from './Components/ResetPassword';
import EditProfile from './Components/EditProfile';
import Form1 from './Components/Form1';
import Check from './Components/Check';




const App = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Form1/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/verify-otp' element={<VerifyOtp/>}/>
            <Route path='/reset-password' element={<ResetPassword/>}/>
            <Route path='/editProfile' element={<EditProfile/>}/>
        </Routes>
         
    </div>
  );
};

export default App;