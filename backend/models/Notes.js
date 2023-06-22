const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the notes model to be used in server database as a collection
const notesSchema = new Schema({
    // join this database with user id in user databse, it is like foreign Key in SQL
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
        default: "general"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// name of the collection is 'notes'
module.exports = mongoose.model('notes', notesSchema);