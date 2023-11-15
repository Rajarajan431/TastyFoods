import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='max-w-md mx-auto p-3'>

      <h1 className='text-3xl font-semibold text-center my-7'>
        Login
      </h1>
      
      <form className='flex flex-col gap-3'>
  
        <input 
          type="text"
          placeholder='Email' 
          className='p-2 border-2 rounded-lg'
          required
        />

        <input 
          type="Password"
          placeholder='Password' 
          className='p-2 border-2 rounded-lg'
          required
        />

        <button className='bg-red-600 p-3 rounded-lg text-white text-lg
          hover:opacity-75'>
          Sign up
        </button>

      </form>

      <div className="flex mt-3 gap-2 font-semibold">
        <p>Dont Have an account?</p>
        <Link to='/signup' className='text-blue-700'>
          Sign up
        </Link>
      </div>

    </div>
  )
}
