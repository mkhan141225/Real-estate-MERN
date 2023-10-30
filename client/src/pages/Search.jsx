import React from 'react'

const Search = () => {
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form className='flex flex-col gap-8 '>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap'>Search Term</label>
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                            className='p-3 rounded-lg border w-full'

                        />
                    </div>

                    {/* handling type */}
                    <div className='flex gap-2 flex-wrap'>
                        <label className='font-semibold '>Type:</label>
                        <div className='flex gap-2'>
                         <input 
                         className='w-5'
                         id="all"
                         type="checkbox"
                         />
                        <span>Rent & Sale</span>
                        </div>

                        <div className='flex gap-2'>
                         <input 
                         className='w-5'
                         id="rent"
                         type="checkbox"
                         />
                        <span>Rent</span>
                        </div>

                        <div className='flex gap-2'>
                         <input 
                         className='w-5'
                         id="sale"
                         type="checkbox"
                         />
                        <span> Sale</span>
                        </div>

                        <div className='flex gap-2'>
                         <input 
                         className='w-5'
                         id="offer"
                         type="checkbox"
                         />
                        <span>Offer</span>
                        </div>
                    </div>

                    <div className='flex gap-2 flex-wrap'>
                        <label className='font-semibold '>Ameneties:</label>
                        <div className='flex gap-2'>
                         <input 
                         className='w-5'
                         id="parking"
                         type="checkbox"
                         />
                        <span>Parking</span>
                        </div>

                        <div className='flex gap-2'>
                         <input 
                         className='w-5'
                         id="furnished"
                         type="checkbox"
                         />
                        <span>Furnished</span>
                        </div>

                        
                    </div>

            <div className='flex items-center gap-3'>
                <label className='font-semibold '>Sort:</label>
                <select id="sort_order" className='border rounded-lg p-3'>
                <option>Price high to low</option>
                <option>Price low to high</option> 
                <option>Latest</option>
                <option>Oldest</option>


                </select>

            </div>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 '>
            Search
        </button>
                </form>
            </div>
            <div className=''>
                <h1 className=' text-3xl font-semibold border-b p-3 mt-5 text-slate-700'> Listing results:</h1>
            </div>


        </div>
    )
}

export default Search