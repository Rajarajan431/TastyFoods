import mongoose, { mongo } from "mongoose";

const listingSChema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        imageUrls: {
            type: Array,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        userRef: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSChema )

export default Listing