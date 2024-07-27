import React,{memo} from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center items-center py-4 mt-1 font-open-sans md:font-source-sans fixed md:static left-0 bottom-0 w-full bg-white box shadow-[0px_0px_2px_1px_rgba(0,0,0,0.3)] md:shadow-none'>

        <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Wellness Retreats. All rights reserved.</p>
    </div>
  )
}

export default memo(Footer)