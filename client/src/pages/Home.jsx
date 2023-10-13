import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
const [form,setForm] = useState({})

const handleSubmit=async (e)=>{
e.preventDefault()

try {
  const res = await fetch('/api/user/',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(form)
  })
  
  const data = await res.json()


} catch (error) {
 
}

}


const handleChange=(e)=>{

setForm({...form,[e.target.id]:e.target.value})

}
  return (
    <div  className='max-w-lg mx-auto '>
    <div className=' text-3xl text-center my-4 font-semibold text-slate-800'>Home

</div>

<div>
  <form onSubmit={handleSubmit} className=' flex flex-col gap-3'>

    <input className='border p-3 rounded-lg' id="email" onChange={handleChange} defaultValue="John@gmail.com" type="text" />
    
    <input id="password" onChange={handleChange} defaultValue="John123" type="text" />
    <button>Submit</button>
  </form>
  <p>{form.email}</p>
  <p>{form.password}</p>
</div>
</div>


   
  )
}

export default Home