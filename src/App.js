import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Camisas from './pages/Camisas';
import Pantalones from './pages/Pantalones';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/camisas' element={<Camisas/>}/>
        <Route path='/pantalones' element={<Pantalones/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App



