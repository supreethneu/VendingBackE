const mongoose = require ("mongoose");

const ProductSchema = new mongoose.Schema({
    prodimg : String,
    prodname: { type: String },
    prodcost: { type: String },
    prodinfo: { type: String },
    uploaded: { type: Date, default: Date.now}
    
});

module.exports = new mongoose.model("Products",ProductSchema);