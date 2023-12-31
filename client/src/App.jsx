import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Header from './components/Header'
import Signup from './pages/Signup'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing'
import UpdatedListing from './pages/UpdatedListing'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/about' element={<About /> } />
        <Route path='/login' element={<Login /> } /> 
        <Route path='/signup' element={<Signup /> } /> 
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<UpdatedListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
