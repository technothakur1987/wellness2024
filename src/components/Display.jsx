import React, { useContext, useState, memo, useEffect } from 'react';
import { AppContext } from '../store/store';
import { Pagination } from 'flowbite-react';
import { IoArrowRedoOutline } from "react-icons/io5";

const Display = () => {
  const { filterData, dispatch } = useContext(AppContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
   
 
 //Whenever there is change in filterData is changed the currentpage is set to 1 show the 1st page 
   useEffect(()=>{setCurrentPage(1)},[filterData])

  // Calculate the index of the first and last item on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current items to display
  const currentItems = filterData.slice(startIndex, endIndex);
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div className="flex flex-wrap items-center justify-start  md:gap-3 lg:gap-[1.5%] px-5 font-open-sans md:font-source-sans">
       {/*mapping data and showing it */}

       {
        filterData.length === 0 ?(
          <div className='flex justify-center items-center w-[100vw] py-5 my-[5vh]'>
                 <h2 className='text-center text-[#1b3252] text-2xl font-medium'>No Retreats to Show ... </h2>

          </div>
         
         
        ):(
          
            currentItems.map((retreat)=>{
                let {id, title, condition, date, description, duration, image, location, price, type,tag } = retreat
                
                {/*converting it into milliseconds*/}
                let newDate = new Date(date * 1000);

                {/*Format the date with options*/} 
                let options = { year: 'numeric', month: 'long', day: 'numeric' };
                let formattedDate = newDate.toLocaleDateString('en-US', options);

                return <div className="    basis-[100%] md:basis-[32.10%] lg:basis-[32.25%]  p-3 bg-[#e0d9cf] rounded-xl shadow-md mb-4 flex flex-col items-start justify-between  min-h-[40vh] md:min-h-[35vh] lg:min-h-[40vh] " key={id}>
                <img src={image} alt={`Image of ${title}` } className='h-[30vh] w-full md:h-[15vh] lg:w-[10vw] object-cover rounded-xl mb-1 '/>
                <h2 className='mb-1 font-semibold font-open-sans md:font-source-sans'>{title}</h2>
                <p className='text-xs text-gray-600  leading-5'>{description.slice(0,70)}...</p>
                <p className='text-xs text-gray-600  leading-5'>Date: {formattedDate}</p>
                <p className='text-xs text-gray-600 leading-5'>Location: {location}</p>
                <p className='text-xs text-gray-600 leading-5'>Price: ${price}</p>

                <div className='flex items-center justify-end w-full'>
                <button onClick={()=>{dispatch({ type: "SHOWRETREATDETAILPAGE", payload: id })}} className="bg-[#1b3252] text-white text-xl  font-black leading-5 px-2 py-1 rounded-full md:rounded float-end cursor-pointer transition duration-300   hover:opacity-75 " aria-label={`View more details about ${title}`}><IoArrowRedoOutline /></button> 
                </div>
               
              </div>
            })
       

        )
       }

       

      </div>
      {/*pagination from flowbite-react libraay*/}
      <div className="flex overflow-x-auto justify-center mb-20 md:mb-0 ">

      {
          filterData.length === 0 ?'':<Pagination
          layout="navigation"
          currentPage={currentPage}
          totalPages={Math.ceil(filterData.length / itemsPerPage)}
          onPageChange={onPageChange}
          previousLabel={<span className="bg-[#1b3252] text-white px-3 py-1 rounded-full md:rounded border-gray-900 transition duration-300   hover:opacity-75" aria-label="Previous Page">Previous</span>}
          nextLabel={<span className="bg-[#1b3252] text-white px-3 py-1 rounded-full md:rounded transition duration-300   hover:opacity-75" aria-label="Next Page">Next</span>}
          className='applyCss'
          
          
        />
      }
        
      </div>
    </>
  );
};

export default memo(Display);
