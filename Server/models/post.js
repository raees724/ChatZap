// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        require:false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    image: {
        type: String,
        required: false
    },
    likes: {
        type: Array,
        default: [],
        required: false
    },
    comments: [{
        text: {
            type: String,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        isDelete: {
            type: Boolean,
            default: false
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports =  Post;
