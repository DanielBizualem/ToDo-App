import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; // Create this component
import Dashboard from '../src/Components/Dashboard'
import ForgotPassword from './Components/ForgotPassword';
import VerifyOtp from './Components/VerifyOtp';



const App = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/verify-otp' element={<VerifyOtp/>}/>
        </Routes>
         
    </div>
  );
};

export default App;