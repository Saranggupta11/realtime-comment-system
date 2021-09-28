const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({
    username: { type: String, required: true },
    comment: { type: String, required: true },
}, { timestamps: true })

const Comments = mongoose.model('comments', commentsSchema)

module.exports = Comments