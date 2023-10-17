import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase'
const CreateListing = () => {

    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
});
    console.log(formData);

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
          setUploading(true);
          setImageUploadError(false);
          const promises = [];
    
          for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
              });
              setImageUploadError(false);
              setUploading(false);
            })
            .catch((err) => {
              setImageUploadError('Image upload failed (2 mb max per image)');
              setUploading(false);
            });
        } else {
          setImageUploadError('You can only upload 6 images per listing');
          setUploading(false);
        }
      };
    
    //handle all promises one by one
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };

      
    const handleRemoveImage = (index) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
      };


    return (
        <main className='p-3 max-w-4xl mx-auto '>

            <h1 className='text-3xl font-semibold text-slate-700 text-center my-7 '>Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>

                    <input type="text" id="name" className='border p-3 rounded-lg' placeholder="Name" maxLength='62' minLength='10' required />
                    <textarea type="text" id="description" className='border p-3 rounded-lg' placeholder="Description" required />
                    <input type="text" id="address" className='border p-3 rounded-lg' placeholder="Address" required />

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type='checkbox' id="sale" className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id="rent" className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id="parking" className='w-5' />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id="furnished" className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id="offer" className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>


                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex items-center gap-2'>
                            <input type="number" id="bedrooms" min="1" max="10" className='p-3 border border-gray-300 rounded-lg' required />
                            <span>Beds</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id="bathrooms" min="1" max="10" className='p-3 border border-gray-300 rounded-lg' required />
                            <span>Baths</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id="regularPrice" min="1" max="10" className='p-3 border border-gray-300 rounded-lg' required />
                            <div className='flex flex-col gap-1 items-center'>
                                <span>Regular price</span>
                                <span className='text-xs'> ($ / month)</span>
                            </div>

                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id="discountPrice" min="1" max="10" className='p-3 border border-gray-300 rounded-lg' required />
                            <div className='flex flex-col gap-1 items-center'>
                                <span>Discounted price </span>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:</p>

                    <span className='font-normal text-gray-600 ml-2'>The first image will be the cover  (max-6) </span>

                    <div className='flex gap-4 '>

                        <input
                            type="file"
                            id="images"
                            onChange={(e) => setFiles(e.target.files)}
                            className=" border border-gray-300 rounded-lg p-3 w-full"
                            accept="image/*"
                            multiple />

                        <button
                            type="button"
                            disabled={uploading}
                            className='p-3 text-green-700 border border-green-700 rounded
                     uppercase hover:shadow-lg disabled:opacity-80'
                            onClick={handleImageSubmit}>

                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>

                    </div>
                    <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>

                    {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) =>
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img src={url} className='object-contain rounded-lg w-20 h-20' alt="listing image" />
                            <button
                                className='p-3 text-red-700 uppercase rounded-lg hover:opacity-75'
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                            >delete</button>

                        </div>

                    )}

                    <button className='border rounded-lg p-3 bg-slate-800 text-white  uppercase
                hover:opacity-95 disabled:opacity-80'>Create List</button>
                </div>

            </form>

        </main>
    )
}

export default CreateListing