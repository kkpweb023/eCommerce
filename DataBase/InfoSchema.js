const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({

    name:String,
    subject:String,
    remarks:String

})

module.exports = mongoose.model('std_attendants',InfoSchema);