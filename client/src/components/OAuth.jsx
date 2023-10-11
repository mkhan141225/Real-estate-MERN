import React from 'react'
import {useDispatch} from 'react-redux'
import { signInSuccess,signInFailure, } from '../redux/user/userSlice' 
import {useNavigate} from 'react-router-dom'
import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'



const OAuth = () => {

    const navigate = useNavigate() 
    const dispatch = useDispatch()
    
const handleGoogleClick =async()=>{
try {
    
const provider = new GoogleAuthProvider()
const auth = getAuth(app)
const result= await signInWithPopup(auth,provider)
console.log(result)

//sending displayname, email and photourl from result to backend
const res= await fetch('api/auth/google',{
    method:'POST',
    headers:{
        'Content-Type' :'application/json',
    },
    body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})

})
const data= await res.json()
console.log(data)
if(data.success==false){
dispatch(signInFailure(data.message))
}
dispatch(signInSuccess(data))
navigate('/')

} catch (error) {
    console.log('could not signin with google',error)
    dispatch(signInFailure(error.message))
}
}
    
  return (
    <button  onClick={handleGoogleClick} type="button" className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90'>Continue with google</button>
  )
}
export default OAuth