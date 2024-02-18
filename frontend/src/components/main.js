import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // // Ejemplo: Verificar si el usuario está autenticado
  // useEffect(() => {
  //   // Lógica para verificar la autenticación y actualizar isLoggedIn
  // }, [])

  // if (!isLoggedIn) {
  //   // Redirigir al usuario a la página de inicio de sesión si no está autenticado
  //   return <Navigate to="/login" />
  // }

  return (
    <div>
      <h2>¡Bienvenido a tu Main!</h2>
      {/* Otro contenido del Main */}
    </div>
  )
}

export default Main