const mongoose = require('mongoose');
const todoschema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const todo = mongoose.model('todo', todoschema);
module.exports = todo;