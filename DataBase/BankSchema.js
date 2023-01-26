const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
    _id:Number,
    mode:String,
    nameCard:String,
    cardNumber:Number,
    expire:String,
    cvv:Number,

})

module.exports = mongoose.model('bankdetails',BankSchema);
