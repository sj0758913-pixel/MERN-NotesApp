import React from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import Notes from './pages/Notes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditNote from './pages/EditNote'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/notes' element={<Notes/>} />
      <Route path='/Home' element={<Home/>} />
      <Route path='/EditNote/:id' element={<EditNote/>}/>
      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
