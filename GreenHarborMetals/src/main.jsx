import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './pages/Homepage.jsx';
import Store from './pages/Store.jsx';
import About from './pages/About.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout';
import Register from './pages/Register.jsx';
import Account from './pages/Account.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Homepage />,
  },
  {
    path:'/store',
    element: <Store />
  },
  {
    path:'/about',
    element: <About />,
  },
  {
    path:'/cart',
    element: <Cart />,
  },
  {
    path:'/register',
    element: <Register />,
  },
  {
    path:'/account',
    element: <Account />,
  },
  {
    path:'/checkout',
    element: <Checkout />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


