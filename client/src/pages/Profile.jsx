import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { 
    updateUserStart, updateUserSuccess, updateUserFailure,
    deleteUserStart, deleteUserSuccess, deleteUserFailure,
    signoutUserStart, signoutUserSuccess, signoutUserFailure 
  } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [fileprec, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formdata, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  //const [showListingError, setShowListingError] = useState(false)
  //const [userListings, setUserListings] = useState([])
  const dispatch = useDispatch()
 
  
  useEffect(() => {
    if(file) {
      handleFileUpload(file)
    }
  },[file])

  //File upload
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formdata, avatar: downloadURL })
        })
      }
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value })
  }

  //Update User
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(updateUserStart())

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),

      });

      const data = await res.json()
      if(data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
      
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  //User Delete
  const handleDelete = async (e) => {
    e.preventDefault()

    try {
      dispatch(deleteUserStart())

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata)
      })
      
      const data = await res.json()

      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return;
      }

      dispatch(deleteUserSuccess(data))
      

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  //User Delete
  const handleSignOut = async() => {
    try {
      dispatch(signoutUserStart())

      const res = await fetch('/api/auth/signout')

      const data = await res.json()

      if(data.success === false){
        dispatch(signoutUserFailure(data.message))
        return;
      }

      dispatch(signoutUserSuccess(data))

    } catch (error) {
        dispatch(signoutUserFailure(error.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input type="file" onChange={(e) => setFile(e.target.files[0])} 
          ref={fileRef} hidden accept='image/*' />
        
        <img onClick={() => fileRef.current.click()} 
          src={formdata.avatar || currentUser.avatar} alt="profile" 
          className='rounded-full h-24 w-24 object-cover 
          cursor-pointer self-center mt-2' />

          <p className='text-sm self-center'>{ fileUploadError ? 
            
            ( <span className='text-red-700'>
              Error Iamge Upload(image must be less than 2 mb)
              </span> 
              ) :
            
              fileprec > 0 & fileprec < 100 ? (
              <span className='text-slate-700'>
                { `Uploading ${fileprec}%` }
              </span>
              
              ):
               
              fileprec === 100 ? (
                <span className='text-green-700'>
                  Image successfully uploaded
                </span>
              ) : ( 
                ""
              ) }
          </p>

          <input type="text" placeholder='username' defaultValue={currentUser.username}
            className='border p-3 rounded-lg' id='username' onChange={handleChange} />
          
          <input type="text" placeholder='email' defaultValue={currentUser.email}
            className='border p-3 rounded-lg' id='email' onChange={handleChange} />
          
          <input type="password" placeholder='password' 
            className='border p-3 rounded-lg' id='password' onChange={handleChange} />

          <button disabled={loading} className='bg-slate-700 text-white rounded-lg cursor-pointer
            p-3 uppercase hover:opacity-95 disabled:opacity-80'>
             { loading ? 'Loading...' : 'Update'  }
              </button>
              <Link to={'/create-listing'} className='bg-green-700 text-white p-3 rounded-lg
               uppercase text-center hover:opacity-95'>
                Create Listing
              </Link>
      </form>
      
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

      <p className='text-red-700 mt-5'>{ error ? error : "" }</p>
      
      <p className='text-green-700 mt-5'>
        { updateSuccess ? "User is updated successfully!" : "" }
      </p>    
      
  
    </div> 
  )
}
