import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

export default function Header() {
  return (
    <header className=''>
         <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-3xl sm:text-xl flex flex-wrap'>
            <span className='text-red-700'>Tasty</span>
            <span className='text-slate-700'>Foods</span>
          </h1>
        </Link>
        
        <form
          
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
        />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
         
         <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>

          <Link to='/login'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Login
            </li>
          </Link>

          <Link to='/signup'>
            <li className='sm:inline rounded-lg bg-red-700 p-2
                text-white hover:opacity-75'>
              Signup
            </li>
          </Link>
          
        </ul>
      </div>
    </header>
  )
}
