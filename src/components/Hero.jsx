import React from 'react'
import headerimage from '../assets/headerimage.png'

const Hero = () => {
  return (
    <div className='h-[fit-content] bg-[#e0d9cf] mx-5 mt-4 mb-0 hidden md:block px-4 py-4 rounded-xl  font-open-sans md:font-source-sans'>
        <img src={headerimage} alt="headerimage" className='w-full rounded-xl mb-3 object-cover h-[38vh]'/>

        <h2 className='mb-1 font-medium'>Discover Your Inner Peace</h2>
        <p className='text-xs text-gray-600'>Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation.</p>
    </div>
  )
}

export default Hero