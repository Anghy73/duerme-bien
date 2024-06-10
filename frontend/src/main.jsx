import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import Clientes from './pages/Clientes.jsx'
import Habitaciones from './pages/Habitaciones.jsx'
import { HabitacionesProvider } from '../contexts/habitaciones.jsx'
import Reservas from './pages/Reservas.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/clientes',
    element: <main className='main'><Clientes /></main>,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/habitaciones',
    element: <div className='main'><HabitacionesProvider><Habitaciones /></HabitacionesProvider></div>,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/reservas',
    element: <div className='main'><Reservas /></div>
  }
  // {
  //   path: '/resumen',
  //   element: <App />
  // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
