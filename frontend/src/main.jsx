import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Clientes from './pages/Clientes.jsx'
import Habitaciones from './pages/Habitaciones.jsx'
import { HabitacionesProvider } from '../contexts/habitaciones.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/clientes',
    element: <Clientes />,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/habitaciones',
    element: <main className='main'><HabitacionesProvider><Habitaciones /></HabitacionesProvider></main>,
    errorElement: <h1>Error</h1>
  }
  // {
  //   path: '/reservas',
  //   element: <App />
  // },
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
