import React from 'react';

import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import PizzaPage from './pages/PizzaPage';

import { Routes, Route } from 'react-router';
import MainLayout from './MainLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<PizzaPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
