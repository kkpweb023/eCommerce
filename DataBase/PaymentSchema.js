const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({

    invoiceNumber:Number,
    gstn:String,
    mode:String,
    nameCard:String,
    itemtotal:String,
    total:Number,
    item:Number,
    address:String,
    status:String,  
    date:String,
    igst:String,
    product:Array,

          
})

module.exports = mongoose.model('payments',PaymentSchema);