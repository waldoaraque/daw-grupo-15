import './styles/index.css'
import './styles/Header.css'
import './styles/Nav.css'
import './styles/Login.css'
import './styles/Diccionario.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './routes/Signup.jsx'
import Login from './routes/Login.jsx'
import Contact from './routes/Contact.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import { AuthProvider } from './auth/AuthProvider.jsx'
import Home from './routes/Home.jsx'
import Diccionario from './routes/Diccionario.jsx'
import Foro from './routes/Foro.jsx'
import Temas from './routes/Temas.jsx'
import Ranking from './routes/Ranking.jsx'
import Temario from './routes/Temario.jsx'
import Logout from './routes/Logout.jsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/diccionario',
        element: <Diccionario />
      },
      {
        path: '/foro',
        element: <Foro />
      },
      {
        path: '/temas/:id',
        element: <Temas />
      },
      {
        path: '/temario',
        element: <Temario />
      },
      {
        path: '/ranking',
        element: <Ranking />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/logout',
        element: <Logout />
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
