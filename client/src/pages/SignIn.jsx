import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'


const SignIn = () => {
  const [formData, setFormData] = useState({})
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)
  const{loading,error}=useSelector((state)=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }

      );

      const data = await res.json()
      console.log(data)
      if (data.success == false) {
        // setLoading(false)
        // setError(data.message)
        dispatch(signInFailure(data.message))
        return
      }

      // setLoading(false)
      // setError(null)
      dispatch(signInSuccess(data))
      navigate('/');

    } catch (error) {
      console.log(error)
      // setLoading(false)
      // setError(error.message)
      dispatch(signInFailure(error.message))

    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-7' >Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit} >

     
        <input type="text" placeholder="email" className="border p-3 rounded-lg" onChange={handleChange} id="email" />
        <input type="text" placeholder="password" className="border p-3 rounded-lg" onChange={handleChange} id="password" />
        <button disabled={loading} className='bg-slate-700 text-white py-3 
rounded-lg uppercase 
hover:opacity-95 disabled:opacity-80' >{loading ? 'loading' : 'Sign In'}</button>


      </form>

      <div className=' flex gap-2 mt-2'>
        <p>Dont have an account?</p>

        <Link to={'/sign-up'}><span className='text-blue-700'>sign up</span></Link>
      </div>
      {error && <p className='text-red-600 uppercase text-center text-lg my-6'>{error}</p>}


    </div>
  )
}

export default SignIn