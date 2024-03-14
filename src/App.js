import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Camisas from './pages/Camisas';
import Pantalones from './pages/Pantalones';
import Layout from './components/Layout';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/camisas' element={<Camisas/>}/>
            <Route path='/pantalones' element={<Pantalones/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App



