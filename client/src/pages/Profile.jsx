import React from 'react'
import {useSelector} from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>

    <h1 className='text-3xl text-center my-7 font-semibold'>Profile</h1>
    <form className='flex flex-col gap-4'>
      <img src={currentUser.avatar} alt='profile'
       className='h-24 w-24 rounded-full  object-cover cursor-pointer self-center'/>
       <input id="username" type="text" placeholder="username" className='border p-3 rounded-lg'/>
       <input id="email" type="email" placeholder="username" className='border p-3 rounded-lg'/>
       <input id="password" type="password" placeholder="password" className='border p-3 rounded-lg'/>
       <button className='border rounded-lg p-3 text-white uppercase bg-slate-700 hover:opacity-95 disabled:opacity-80'>Update</button>
    </form>
<div className='flex justify-between mt-5'>
  <span className='text-red-700 cursor-pointer'>Delete Account</span>
  <span className='text-red-700 cursor-pointer'>Sign Out</span>
</div>
    </div>
  )
}

export default Profile