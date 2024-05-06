import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex justify-between items-center px-4 h-20'>
      <div className='logo font-bold text-black text-2xl'>
        <span className='text-green-500'>&lt;</span>
        <span>pass</span><span className='text-green-500'>OP/&gt;</span>
      </div>
      {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href='/'>Home</a>
            <a className='hover:font-bold' href='#'>About</a>
            <a className='hover:font-bold' href='#'>Contact</a>
        </li>
      </ul> */}
      <button className='text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center'>
        <a href="https://github.com/AniketKhonde" className='text-white bg-green-700 my-2 mx-2 rounded-full flex justify-between items-center' target="_blank" rel="noopener noreferrer">
          <img className='invert w-10 p-1' src="/icons/github.png" alt="GitHub logo" />
          <span className='font-bold px-2'>GitHub</span>
        </a>
      </button>
    </nav>
  )
}

export default Navbar
