const mongoose = require( "mongoose" );

const { Schema } = mongoose;

const productSchema = new Schema( {
    id: { type: String, required: true },
    price: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true, enum: [ "xs", "s", "m", "l", "xl" ] },
}, {
    timestamps: true,
} );

module.exports = mongoose.model( "Product", productSchema );
