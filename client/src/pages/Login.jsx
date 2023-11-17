import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { 
    signInStart, 
    signInSuccess, 
    signInFailure 
  } from '../redux/user/userSlice'

export default function Login() {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.user)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart())

      const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formData)
    })

    const data = await res.json()
    console.log(data);

    if(data.success === false) {
      dispatch(signInFailure(data.message))
      return
    }

    dispatch(signInSuccess(data))
    navigate("/")

    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='max-w-md mx-auto p-3'>

      <h1 className='text-3xl font-semibold text-center my-7'>
        Login
      </h1>
      
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
  
        <input 
          type="text"
          placeholder='Email' 
          className='p-2 border-2 rounded-lg'
          onChange={handleChange}
          id='email'
          required
        />

        <input 
          type="Password"
          placeholder='Password' 
          className='p-2 border-2 rounded-lg'
          id='password'
          onChange={handleChange}
          required
        />

        <button  
          disabled={loading}
          className='bg-red-600 p-3 rounded-lg text-white text-lg
          hover:opacity-75'>
          { loading ? "Loading..." : "Sign In" }
        </button>

      </form>

      <div className="flex mt-3 gap-2 font-semibold">
        <p>Dont Have an account?</p>
        <Link to='/signup' className='text-blue-700'>
          Sign up
        </Link>
      </div>
      {error && <p className='text-red-700 mt-5'>{error}</p>}

    </div>
  )
}
