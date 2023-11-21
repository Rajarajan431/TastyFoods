import Listing from '../model/listingModel.js'
import { errorHandler } from '../utils/errorHandler.js'

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}   