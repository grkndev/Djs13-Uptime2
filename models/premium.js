const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: String
})

module.exports = mongoose.model("premium", schema)