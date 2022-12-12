const mongoose = require('mongoose');
//foreing key with poeple

const bookingSchema = mongoose.Schema({
    date:String,
    NbreDePlace:Number,
    idUser :  {type: mongoose.Schema.Types.ObjectId, ref: 'userss'}
});


const Booking = mongoose.model('bookings', bookingSchema);
module.exports = Booking;
