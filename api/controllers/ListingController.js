import Listing from "../models/ListingModel.js";
import { errorHandler}  from "../utils/Error.js";



export const createListing = async(req,res,next)=>{

try {
    
const listing = await Listing.create(req.body)
return res.status(201).json({message:"success",listing})

} catch (error) {
    next(error)
}



}