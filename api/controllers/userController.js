import { errorHandler } from "../utils/errorHandler.js"
import bcryptjs from 'bcryptjs'
import User from '../model/userModel.js'
import Listing from '../model/listingModel.js'

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, '"You can only update your own account!'))
    }

    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
    
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            //looks for changes in the data
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            },
        }, { new: true } ) //when the new changes are set this line of code update and save them
        
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}


export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can delete only your own account!'))

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('User is deleted')
    } catch (error) {
        next(error)
    }
}

export const getUserListing = async (req, res, next) => {
    if(req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id })
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    }
   
}