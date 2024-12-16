import React from 'react'
import { Routes, Route } from 'react-router-dom';
import RegisterUser from './pages/RegisterUser';
import LoginUser from './pages/LoginUser';
import Search from './pages/Search';
import Report from './pages/Report';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegisterUser />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/search" element={<Search />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  )
}

export default App