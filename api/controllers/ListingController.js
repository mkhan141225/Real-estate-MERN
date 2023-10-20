import Listing from "../models/ListingModel.js";
import { errorHandler } from "../utils/Error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    //listing exist
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    //if authenticated user is owner of listing
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only delete your own listings"));
    }
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json("Listing has been deleted");
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(402, "listing does not exist"));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "you can only update your listings"));
    }

    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(errorHandler(505,"something went wrong in updateListing"))
  }
};

export const getListing=async(req,res,next)=>{

  try {
      //listing exist
   const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  
  res.status(200).json(listing)
    
  } catch (error) {
    next(errorHandler(505,"something went wrong in getListing"))
  }
 
}
