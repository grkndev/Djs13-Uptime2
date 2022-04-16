const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    link: String,
    sahip: String
    })
    
module.exports = mongoose.model('links', schema)