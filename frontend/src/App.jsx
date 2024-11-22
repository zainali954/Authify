import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import VerifyEmail from './pages/auth/VerifyEmail'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import UserDashboard from './pages/user/UserDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'

const App = () => {
  return (
    <div>
      <Router future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <Routes>
          <Route path='/' element={<UserDashboard/>} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/verify-email' element = {<VerifyEmail/>} />
          <Route path='/forgot-password' element = {<ForgotPassword/>} />
          <Route path='/reset-password' element = {<ResetPassword userEmail="abc"/>} />
          <Route path='/admin/' element={<AdminDashboard/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
