import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white w-full sm:w-[320px] shadow-md hover:shadow-lg transition:shadow overflow-hidden rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || "https://https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.unsplahttps://www.google.com/url?sa=i&url=https%3A%2F%2Fmiddlemankerala.com%2Fmiddleman-real-estate%2F&psig=AOvVaw0SN9nqGiU5Nv-kZ9Fmz3e3&ust=1699043360416000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjYrvGTpoIDFQAAAAAdAAAAABAKsh.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt=""
          className=" h-[320px] w-full sm:h-[220px] 
                object-cover hover:scale-110 transition-scale

                 duration-300"
        />
        <div className="p-3">
          <p className=" text-lg font-semibold  text-slate-700 mt-5 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1 my-2">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-gray-600 text-sm w-full">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
            <p className="text-slate-500 mt-2 font-semibold ">
               ${listing.offer?listing.discountPrice.toLocaleString('en-US'):listing.regularPrice.toLocaleString('en-US')}
                {listing.type==='rent' && '/ month'}
            </p>
            <div className="text-slate-700 flex gap-4">
                <div className="font-bold text-xs ">
                    {listing.bedrooms > 1? `${listing.bedrooms} beds` : `${listing.bedrooms} bed` }
                </div>
                <div className="font-bold text-xs ">
                    {listing.bathroomss > 1? `${listing.bathrooms} baths` : `${listing.bathrooms} bath` }
                </div>
            </div>
           
        </div>
      </Link>
    </div>
  );
  
};

export default ListingItem;
