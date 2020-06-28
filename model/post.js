const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        max: 250,
        min:2,
        required: true
    },
    imgUrls: [String],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tag: {
       type: String,
       min: 2,
       max: 100,
       required: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('postik', postSchema)
