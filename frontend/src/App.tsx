import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signin } from './pages/Signin'
import { StudentDashboard } from './pages/StudentDashboard'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin/>}/>
      <Route path="/student/dashboard" element={<StudentDashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
