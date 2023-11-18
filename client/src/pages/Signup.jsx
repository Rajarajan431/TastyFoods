import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

export default function Signup() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)

      const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formData)
    })

    const data = await res.json()
    console.log(data);

    if(data.success === false) {
      setLoading(false)
      setError(data.message)
      return
    }

    setLoading(false)
    setError(null)
    navigate("/")

    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='max-w-md mx-auto p-3'>

      <h1 className='text-3xl font-semibold text-center my-7'>
        Sign up
      </h1>
      
      <form 
        className='flex flex-col gap-3' 
        onSubmit={handleSubmit}>
        
        <input 
          type="text"
          placeholder='UserName' 
          className='p-2 border-2 rounded-lg'
          id='username'
          required
          onChange={handleChange}
        />

        <input 
          type="text"
          placeholder='Email' 
          className='p-2 border-2 rounded-lg'
          id='email'
          required
          onChange={handleChange}
        />

        <input 
          type="Password"
          placeholder='Password' 
          className='p-2 border-2 rounded-lg'
          id='password'
          required
          onChange={handleChange}
        />

        <button disabled={loading} 
          className='bg-red-600 p-3 rounded-lg text-white text-lg
          hover:opacity-75'>
          { loading ? 'Loading...' : 'Sign Up' }
        </button>
        <OAuth />

      </form>

      <div className="flex mt-3 gap-2 font-semibold">
        
        <p>Have an account?</p>
        
        <Link to='/login' className='text-blue-700'>
          Login
        </Link>
      
      </div>

      {error && <p className='text-red-700 mt-5'>{error}</p>}

    </div>
  )
}
