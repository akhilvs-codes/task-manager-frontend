
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/signup'

function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
