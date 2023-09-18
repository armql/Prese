import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import './index.css'
import { ContextProvider } from './contexts/ContextProvider.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ContextProvider>
  </React.StrictMode>,
)
