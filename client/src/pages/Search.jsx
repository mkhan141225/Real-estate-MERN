import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Search = () => {
    const [sidebardata, setSidebardata] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "created_at",
        order: "desc",
    });
    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }
        //to display listings according to search
        const fetchListings = async () => {
            setLoading(true);

            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            // if (data.length > 8) {
            //   setShowMore(true);
            // } else {

            // }
            setListings(data);
            setLoading(false);
        };

        fetchListings();
    }, [location.search]);



    const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'rent' ||
            e.target.id === 'sale'
        ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }

        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setSidebardata({
                ...sidebardata,
                [e.target.id]:
                    e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    console.log(listings);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form className="flex flex-col gap-8 " onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap">Search Term</label>
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                            className="p-3 rounded-lg border w-full"
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    {/* handling type */}
                    <div className="flex gap-2 flex-wrap">
                        <label className="font-semibold ">Type:</label>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                id="all"
                                type="checkbox"
                                checked={sidebardata.type === "all"}
                                onChange={handleChange}
                            />
                            <span>Rent & Sale</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                id="rent"
                                type="checkbox"
                                checked={sidebardata.type === "rent"}
                                onChange={handleChange}
                            />
                            <span>Rent</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                id="sale"
                                type="checkbox"
                                checked={sidebardata.type === "sale"}
                                onChange={handleChange}
                            />
                            <span> Sale</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                id="offer"
                                type="checkbox"
                                checked={sidebardata.offer}
                                onChange={handleChange}
                            />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <label className="font-semibold ">Ameneties:</label>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                id="parking"
                                type="checkbox"
                                checked={sidebardata.parking}
                                onChange={handleChange}
                            />
                            <span>Parking</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                id="furnished"
                                type="checkbox"
                                checked={sidebardata.furnished}
                                onChange={handleChange}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="font-semibold ">Sort:</label>
                        <select
                            onChange={handleChange}
                            defaultValue={"created_at_desc"}
                            id="sort_order"
                            className="border rounded-lg p-3"
                        >
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 ">
                        Search
                    </button>
                </form>
            </div>
            <div className="flex-1">
                <h1 className=" text-3xl font-semibold border-b p-3 mt-5 text-slate-700">
                    {" "}
                    Listing results:

                </h1>
                <div className="p-7 flex flex-wrap gap-7  ">
                    {!loading && listings.length === 0 && (
                        <p className='text-xl text-slate-700 text-center w-full'>No Listing Found</p>
                    )}
                    {loading && (<p className='text-xl text-slate-700 text-center w-full'>Loading...</p>)}
               
                    {!loading && listings && listings.map((listing)=>(<ListingItem key={listing._id} listing = {listing}/>))} 
               </div>
            </div>
        </div>
    );
};

export default Search;
