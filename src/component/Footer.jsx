import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center h-20 mb-0 w-full mt-10'>
        <div className='logo font-bold text-white text-2xl'>
            <span className='text-green-500'>&lt;</span>
            <span>pass</span><span className='text-green-500'>OP/&gt;</span>
        </div>
         <div className='flex justify-center items-center'>crete with <img className='w-7 mx-2' src='icons/heart.png' /> by Aniket Khonde
         </div>
    </div>
   
  )
}

export default Footer
