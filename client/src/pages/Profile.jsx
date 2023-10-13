import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase';
import { signoutUserStart,signoutUserFailure,signoutUserSuccess,deleteUserSuccess,deleteUserStart,deleteUserFailure, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';


const Profile = () => {
  const fileRef = useRef(null)
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
const[updateSuccess,setUpdateSuccess] =useState(false)

  //firebase storage rules 
  // allow read;
  // allow write: if request.resource.size<2 * 1024*1024 && 
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is ' + progress + '%done')
        setFilePerc(Math.round(progress))

      },
      (error) => { setFileUploadError(true) },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL })
          })

      }

    );
  }

//handle input data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }; 

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
    
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  
  //delete account
 const deleteAccount=async()=>{
  try {
    dispatch(deleteUserStart())
    const res= await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE'

    })
const data =  await res.json();
if(data.success === false){ dispatch(deleteUserFailure(data.message));
 return
}
dispatch(deleteUserSuccess(data))

  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
 }

//signout
const handleSignOut=async()=>{
  dispatch(signoutUserStart())
 try {
   const res = await fetch('/api/auth/signout')
   const data = await res.json()
   dispatch(signoutUserSuccess(data))
   if(data.success===false){return dispatch(signoutUserFailure(data.message)) }

  } 
  catch (error) {
    dispatch(signoutUserFailure(error.message))
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center my-7 font-semibold'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept='image/*' />

        <img src={formData.avatar || currentUser.avatar} alt='profile'
          onClick={() => fileRef.current.click()}

          className='h-24 w-24 rounded-full  object-cover cursor-pointer self-center' />

        <p className='text-sm text-center'>
          {fileUploadError ?
            (<span className='text-red-700' >Error Image Upload</span>) :
            filePerc > 0 && filePerc < 100 ? (<span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>) :
              filePerc === 100 ? (<span className='text-green-600'>Image successfully uploaded</span>) : ""


          }

        </p>

        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button disabled={loading} className='border rounded-lg p-3 text-white uppercase bg-slate-700 hover:opacity-95 disabled:opacity-80'>
        {loading?"Loading..":"Update"}
          </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={deleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-4'>{error?error:""}</p>
      <p className='text-red-700 mt-4'>{updateSuccess?"User Successfully updated":""}</p>
    </div>
  )
}

export default Profile