const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TaskShema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Task', TaskShema);
