import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingBag,FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <header className=''>
         <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-2xl sm:text-3xl flex flex-wrap'>
            <span className='text-red-700'>Fresh</span>
            <span className='text-slate-700'>Pizza</span>
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
        
        <ul className='flex gap-4 items-center'>
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

          <li>
            { /* make it as private route so that users cannot place the order before signing up or login in */ }
            <FaShoppingBag size={20} />
          </li>

          <Link to='/profile'>
            { currentUser ? (
                <img src={currentUser.avatar} alt="User Profile image" 
                  className='w-7 h-7 rounded-full '/>
              ) : (
                <li className='hidden sm:inline text-slate-700 
                  hover:underline object-cover'> 
                  Login
                </li>
              )
          
            }
          </Link>
          
        </ul>
      </div>
    </header>
  )
}
