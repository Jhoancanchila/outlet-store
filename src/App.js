import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Women from './pages/Women';
import Men from './pages/Men';
import Layout from './components/Layout';
import NotFoundPage from './pages/NotFoundPage';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Tecnology from './pages/Tecnology';
import Jewelery from './pages/Jewelery';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/mujer' element={<Women/>}/>
            <Route path='/hombre' element={<Men/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/joyería' element={<Jewelery/>}/>
            <Route path='/tecnología' element={<Tecnology/>}/>
            <Route path='/:id' element={<ProductDetail/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App



