import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow 
    overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] 

          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
        </div>
        
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.description}
          </p>
        </div>
        
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className=' text-lg font-semibold text-slate-700'>
               Price: ${listing.price}
          </p>
        </div>

        <div className='p-3 flex flex-col  w-full'>
          <p className=' flex items-center gap-2 text-lg font-semibold text-slate-700'>
               Likes: <FaHeart size={20} className='text-red-700'/>{listing.rating}
          </p>
        </div>

        <div className="flex flex-col mx-auto mt-2">
            <button className='text-white bg-rose-700 p-2 hover:opacity-80'>
                Add to Cart
            </button>
        </div>

      </Link>
    </div>
  );
}