import React, { memo, useContext } from 'react';
import { AppContext } from '../store/store';
import { RxCross2 } from "react-icons/rx";

const RetreatDetailPage = () => {
    const { dispatch, showProductDetailpage, showProductDetailId, filterData } = useContext(AppContext);

    // Getting complete details of a particular retreat from filter data
    const retreatDetail = filterData.find((item) => Number(item.id) === Number(showProductDetailId));

    if (!retreatDetail) {
        return null; // Return null or a loading state if no retreatDetail is found
    }

    // Convert the Unix timestamp to milliseconds and format the date
    const newDate = new Date(retreatDetail.date * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = newDate.toLocaleDateString('en-US', options);

    return (
      <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]'>
        <div className='bg-white  p-3 md:p-12 rounded-lg shadow-lg w-[95%] md:max-w-lg md:w-full relative animate-slide-in'>
          <button
            className='absolute  top-[-10%] md:top-1 right-0 md:right-1 text-white md:text-[#1b3252]  text-4xl md:text-3xl py-2  px-1 md:px-4 rounded hover:scale-[125%] transition duration-300'
            onClick={() => { dispatch({ type: "HIDERETREATDETAILPAGE" }); }}
          >
            <RxCross2 />
          </button>
          <img
            src={retreatDetail.image}
            alt={retreatDetail.title}
            className='w-full  h-[20vh] md:h-[32vh] object-cover rounded-md mb-4'
          />
          <h1 className='text-2xl font-bold mb-4 text-center border-b-2 text-[#1b3252]'>{retreatDetail.title}</h1>
          <p className='text-gray-700 mb-2'>{retreatDetail.description}</p>
          <p className='text-[#1b3252]'><strong>Location:</strong> {retreatDetail.location}</p>
          <p className='text-[#1b3252]'><strong>Date:</strong> {formattedDate}</p>
          <p className='text-[#1b3252]'><strong>Duration:</strong> {retreatDetail.duration} days</p>
          <p className='text-[#1b3252]'><strong>Price:</strong> ${retreatDetail.price}</p>
          <p className='text-[#1b3252]'><strong>Focus Areas:</strong> {retreatDetail.tag.join(', ')}</p>
          <p className='text-[#1b3252]'><strong>Type:</strong> {retreatDetail.type}</p>
          <div className='flex items-center justify-end w-full'>
                <button  className="bg-[#1b3252] text-white px-3 py-1 rounded-full md:rounded border-gray-900 transition duration-300   hover:opacity-75" aria-label={`View more details about ${retreatDetail.title}`}>Proceed to Buy</button> 
                </div>
        </div>
      </div>
    );
};

export default memo(RetreatDetailPage);
