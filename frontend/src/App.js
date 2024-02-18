import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//import Navegacion from './components/navbar'
import Login from './components/login'
import Main from './components/main'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' Component={Login} />
        <Route path='/main' Component={Main} />
      </Routes>
    </Router>
    // <div>
    //   Hola Mundo
    //   <Login />
    // </div>
  )
}

export default App
