const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folderSchema = new Schema({
    name: {
        type: String
    },
    user: {
        type: String,
        ref: 'User'
    },
    parent: {
        type: Schema.ObjectId,
        ref: 'Folder'
    },
    dateCreate: {
        type: String
    },
    size: {
        type: String
    },
    type: {
        type: String
    },
    path: {
        type: String
    }
})

module.exports = mongoose.model('Folder', folderSchema)