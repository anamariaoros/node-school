const uuid = require( "uuid" );
const bcrypt = require( "bcrypt" );
const mongoose = require( "mongoose" );

const { Schema } = mongoose;

const userSchema = new Schema( {
    id: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true, min: 18 },
    gender: { type: String, required: true, enum: [ "male", "female" ] },
}, {
    timestamps: true,
} );

userSchema.methods.setId = function setId( ) {
    this.id = uuid();
};

userSchema.methods.fullname = function fullname( firstname, lastname ) {
    return firstname + lastname;
};

userSchema.methods.setPass = function setPass( password ) {
    const saltRounds = 10;
    bcrypt.hash( password, saltRounds, function( err, hash ) {
        this.password = hash;
    } );
};

module.exports = mongoose.model( "User", userSchema );
