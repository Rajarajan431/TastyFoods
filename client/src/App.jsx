import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Header from './components/Header'
import Signup from './pages/Signup'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/about' element={<About /> } />
        <Route path='/login' element={<Login /> } /> 
        <Route path='/signup' element={<Signup /> } /> 
      </Routes>
    </BrowserRouter>
  )
}
