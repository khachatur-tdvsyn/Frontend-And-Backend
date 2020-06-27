const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        max: 250,
        min:2,
        required: true
    },
    imgUrl: {
        type: String,
        max: 100,
        min:2,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('postik', postSchema)
