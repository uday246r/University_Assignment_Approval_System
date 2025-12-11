import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signin } from './pages/Signin'
import { StudentDashboard } from './pages/StudentDashboard'
import { AdminDashboard } from './pages/AdminDashboard'
import { ProfessorDashboard } from './pages/professorDashboard'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin/>}/>
      <Route path="/student/dashboard" element={<StudentDashboard/>} />
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      <Route path="/professor/dashboard" element={<ProfessorDashboard/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
