
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
        
    },

});

module.exports = mongoose.model('order', OrderSchema)
