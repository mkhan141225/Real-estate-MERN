import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper,SwiperSlide} from 'swiper/react' 
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

const Listing = () => {

    SwiperCore.use([Navigation]) 
  const params = useParams();
  const [listing, setListing] = useState(null);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        setError(false)
        if (data.success === false) {
          console.log(data.message);
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);


      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  
  }, [params.listingId]);

  return <main>
    {loading && <p className="text-center">loading...</p>}
  
    {error && <p className="text-2xl text-center my-7">Something went wrong</p>}
    {listing && !loading && !error && (
        <>
        <h1>{listing.name}</h1>
        <Swiper navigation>

        {listing.imageUrls.map((url)=>(
            <SwiperSlide key={url}>
                <div className="h-[550px]" style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover'}}></div>


            </SwiperSlide>
        ))}


        </Swiper>
        </>


    )}
    </main>
};

export default Listing;
