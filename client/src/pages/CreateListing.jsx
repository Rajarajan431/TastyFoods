import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../Firebase'

export default function CreateListing() {
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
      imageUrls: [],
    })
    const [imageUploadError, setimageUploadError] = useState(false)
    const [uploading, setUploading] = useState(false)

    console.log(formData);

    const handleImageSubmit =  (e) => {
      if(files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true)
        setimageUploadError(false)
        const promises = []

        for(let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData, 
            imageUrls: formData.imageUrls.concat(urls)
          });
          setimageUploadError(false)
          setUploading(false)
        })
        .catch((error) => {
          setimageUploadError('Image upload failed (2 mb max per image)')
          setUploading(false)
        })
      } else {
        setimageUploadError('You can only upload 6 images per listing')
        setUploading(false)
      }

    }

    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name   
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(Math.round(progress))
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          });
          
        });
      });
    } 

    const handleRemoveImage = (index) =>{
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index)
      })
    }

  return (
    <main className='p-3 max-w-lg mx-auto'>
        
        <div className="text-center my-7">
            <h1 className='text-2xl font-medium'>My Listing</h1>
        </div>

        <form className='flex flex-col gap-4'>
            
            <input 
                type="text" 
                placeholder='Name'
                id='name' 
                className='border p-3 rounded-lg'
                minLength='10'
                maxLength='62'    
            />

            <textarea 
                type="text" 
                placeholder='Description'
                id='description' 
                className='border p-3 rounded-lg'
                minLength='10'
                maxLength='62'    
            />

           <div className="flex flex-wrap gap-6 border 
                rounded-lg p-3 justify-between">
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='veg'
                className='w-5'
                
              />
              <span>Veg</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='nonveg'
                className='w-5'
               
              />
              <span>Non-Veg</span>
            </div>

           </div>

           <div className="flex border p-3 rounded-lg 
                items-center justify-between">
                <span className='text-lg'>Price</span>
                <input 
                    type="number"
                    id='price'
                    min='50'
                    max='10000'
                    className='p-3 border border-slate-700 rounded-lg'    
                />
                
           </div>

            <div className="flex border p-3 rounded-lg
                items-center justify-between">
                    <span className='text-lg'>Like</span>
                    <input 
                        type="number"
                        id='rating'
                        min='0'
                        max='100000'
                        className='p-3 border border-slate-700 rounded-lg'
                    />
            </div>

            <div className="flex border p-3 rounded-lg items-center 
                justify-between">
                <p className='font-semibold'>Images</p>
                <input 
                    onChange={(e) => setFiles(e.target.files)}
                    type="file"
                    id='images'
                    accept='image/*'
                    multiple
                    className='p-3 border border-gray-300
                        rounded max-w-lg' 
                />
            </div>

            <button
              onClick={handleImageSubmit}
              type='button' 
              className='p-3 bg-green-700 text-white rounded-lg 
              uppercase hover:opacity-95 disabled:opacity-80'>
               { uploading ? 'Uploading...' : 'Upload' }
            </button>

            <p className='text-red-700 text-sm'>
                    { imageUploadError && imageUploadError }
            </p>

            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className='flex justify-between p-3 border items-center'
                >
                  <img
                    src={url}
                    alt='listing image'
                    className='w-20 h-20 object-contain rounded-lg'
                  />
                  <button
                    disabled={uploading}
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                  >
                    Delete
                  </button>
                  
                </div>
                
            ))}


        </form>

    </main>
  )
}
