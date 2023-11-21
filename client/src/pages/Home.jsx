import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import ListingItem from '../components/ListingItem';
import { FaPizzaSlice } from 'react-icons/fa'

export default function Home() {
  const { currentUser } = useSelector((state) => state.user)
  const [userListings, setUserListings] = useState([])
  const [showListingsError, setShowListingsError ] = useState(false)

  const heroStyle = {
    background: `url('/assets/hero.jpg') center/cover no-repeat`,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '8rem',
    maxWidth: '6xl',
    margin: '0 auto',
  };

  const handleShowListings = async (e) => {
    e.preventDefault()

    try {
      setShowListingsError(false)

      const res = await fetch(`/api/user/listings/${currentUser._id}`)

      const data = await res.json()

      if(data.success === false){
        setShowListingsError(true)
        return;
      }

      setUserListings(data)
      
    } catch (error) {
      setShowListingsError(false)
    }
  }

  return (
    <div className='bg-slate-100'>
      {/* Hero section */}
      <div style={heroStyle}>
        <h1 className='text-4xl font-bold'>Special Offer</h1>
        <p className='text-2xl'>Grab the new Midnight Bliss Delight</p>
        <p className='max-w-lg'>
          Embark on a taste adventure with our latest creation, the Midnight Bliss Delight! 
          Picture a canvas of charcoal-infused crust, topped with a rich blend of truffle-infused 
          Alfredo sauce, succulent pieces of grilled chicken, and a symphony of caramelized onions. This is not just a pizza; it's a culinary journey into the luxurious realms of flavor, where each bite is a revelation.
        </p>
      </div>

      { /* About Section */ }
        
        <div className="max-w-full mx-auto bg-white">
          <div className="border-4 border-black flex flex-row">
            <img 
              src='/assets/about.jpg' alt="about"
              className='max-w-[340px] p-4 sm:max-w-[350px]
                sm:mx-auto border mx-1 my-4' 
              />
              <div className="border-2 my-10 ml-10 mx-2 sm:mx-auto max-w-[600px]
                sm:max-w-[400px]">
                <h1 className='text-3xl font-bold'>Why Choose Us</h1>
                <p className='mt-3'>
                  Welcome to Fresh Pizza, where passion for pizza meets a commitment to quality! Established with a love for crafting the perfect slice, Fresh Pizza is more than just a pizzeria; 
                  it's a culinary experience dedicated to bringing joy to your taste buds.
                </p>
              </div>
          </div>
          
        </div>
     

      {/* Our menu */}
       <div className="max-w-6xl p-4 mx-auto">
        
        <h2 className=' text-center mt-5 text-3xl text-rose-700 font-semibold'>
          Our Menu
        </h2>

        <div className=" p-2 mt-5">
          <ul className='flex justify-evenly gap-2 cursor-pointer'>
            <li className='text-2xl' onClick={handleShowListings}>Pizza</li>
            <li className='text-2xl' >Deserts</li>
            <li className='text-2xl' >Burgers</li>
            <li className='text-2xl' >Drinks</li>
          </ul>
        </div>

        { userListings && userListings.length > 0 &&

            <div className="mt-5 max-w-6xl mx-auto p-3 flex flex-col flex-wrap 
              sm:flex-row  gap-8 my-10">
              { userListings.map((listing) => (
                 <ListingItem listing={listing} key={listing._id} />
             )) }
            </div>
        }

       </div>

        {/* service banner */ }

      <div className="">
        
        <div className="text-center mt-5">
          <h1 className='text-3xl font-bold text-gray-600'>We offer the BEST Pizza </h1>
        </div>

        <div className="bg-white shadow-md hover:shadow-lg transition-shadow mt-5
          overflow-hidden rounded-lg w-full flex justify-center flex-col flex-wrap 
          sm:flex-row mx-auto sm:justify-center">
          
          <div className="border-2 border-slate-300 flex flex-col p-4 mt-4 mb-4 mx-2 
            rounded-lg w-[330px] ml-[100px]">
            <FaPizzaSlice className='mx-auto' size={40} />
            <span className='text-center mt-4 font-bold'>Qualtiy Foods</span>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className="border-2 border-slate-300 flex flex-col p-4 mt-4 mb-4 mx-2 
            rounded-lg w-[330px] ml-[100px]">
            <FaPizzaSlice className='mx-auto ' size={40} />
            <span className='text-center mt-4 font-bold'>Fast Delivery</span>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className="border-2 border-slate-300 flex flex-col p-4 mt-4 mb-4 mx-2 
            rounded-lg w-[330px] ml-[100px]">
            <FaPizzaSlice className='mx-auto' size={40} />
            <span className='text-center mt-4 font-bold'>24/7 Customer Support</span>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>

          
        
        
        </div>

      </div>

      

    </div>
  );
}
