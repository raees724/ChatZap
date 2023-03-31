// import Post from '../models/Post.js';
// import cloudinary from '../config/cloudinery.js';

const Post = require('../models/Post.js');
// const   Cloudinary = require('../config/cloudinary.js');
const   cloudinary = require('../config/cloudinary.js');


module.exports = {

// Add Post
    createPost : async (req, res) => {
        console.log('create post request');
        try {
            console.log(req.body)
            const content  = req.body.content;
            const imagePath  = req.body.imagePath;
            const id  = req.params.id;

            console.log(content,' || ', imagePath, ' || ', id);

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "Posts"
            });
    
            const newPost = new Post({
                content,
                author: id,
                image: result.secure_url,
                likes:{}
            });
    
            const savedPost = await newPost.save();
            const populatedPost = await Post.findById(savedPost._id)
                .populate('author', 'username profilePic')
                .populate('comments.author', 'username profilePic')
                .exec();
            
            res.status(201).json(populatedPost);
        } catch (error) {
            console.log(' create post error => ',error)
            res.status(500).json({ message: error.message });
        }
    },

// Get Post
    getPosts : async (req, res) => {
        console.log('4555555555')
        console.log('49999999')

        try {
            const posts = await Post.find()
                .populate('author', 'username profilePic')
                .populate({
                    path: 'comments',
                    populate: { path: 'author', select: 'username profilePic' },
                    options: { sort: { createdAt: -1 } }
                })
                .sort({ createdAt: -1 })
                .exec();
            
               console.log('posts = >',posts)
            res.status(200).json(posts);
    
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

        
    },

// Like Post
     likePost : async (req, res) => {
        console.log('likePost')
        try {
            const { id } = req.params;
            const { loggedInUserId } = req.body;
            const post = await Post.findById(id);
            console.log('id =', id);
            console.log('id =', loggedInUserId);
            const isLiked = post.likes.includes(loggedInUserId);
    
            if (isLiked) {
                post.likes.pull(loggedInUserId);
            } else {
                post.likes.push(loggedInUserId);
            }
    
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { likes: post.likes },
                { new: true }
            );
    
            const populatedPost = await Post.findById(updatedPost._id)
                .populate('author', 'username profilePic')
                .populate('comments.author', 'username profilePic')
                .exec();
    
            res.status(200).json(populatedPost);
        } catch (err) {
            console.log('likepost error =>',err)
            res.status(500).json({ message: err.message });
        }
    },

// Comment Post
    commentPost : async (req, res) => {
       try {
           const { id } = req.params;
           const { comment, loggedInUserId } = req.body;
           const post = await Post.findById(id);
           post.comments.unshift({ text: comment, author: loggedInUserId, isDelete: false });
    
           const savedPost = await post.save();
           
           const populatedPost = await Post.findById(savedPost._id)
               .populate('author', 'username profilePic')
               .populate({
                   path: 'comments',
                   populate: { path: 'author', select: 'username profilePic' },
                   options: { sort: { createdAt: -1 } }
               })
               .exec();
    
           res.status(201).json(populatedPost);
       } catch (err) {
           res.status(404).json({ message: err.message });
       }
    },
    

    getUserPost : async (req, res) => {

    //    try {
    //        const { id } = req.params;
    //        console.log("USERRRRRRRRRR ID",id);
    //        const posts = await Post.findById( id )
    //            .populate('author', 'username profilePic')
    //            .populate({
    //                path: 'comments',
    //                populate: { path: 'author', select: 'username profilePic' },
    //                options: { sort: { createdAt: -1 } }
    //            })
    //            .sort({ createdAt: -1 })
    //            .exec();
           
    //        res.status(200).json(posts)
    //    } catch (err) {
    //        res.status(404).json({ message: err.message });
    //    }
    try{
        let id = req.params.id;
        console.log('ddd ',id)
    const posts = await Post.find({author:id})
    .populate('author', 'username profilePic')
               .populate({
                   path: 'comments',
                   populate: { path: 'author', select: 'username profilePic' },
                   options: { sort: { createdAt: -1 } }
               })
               .sort({ createdAt: -1 })
               .exec();
           
               console.log(posts);
               console.log(".............................");
           res.status(200).json(posts)
        }catch(error){
            console.log('170 errrrrrrrr ',error);
            res.status(500)
        }
    },


//Delete Post 
    deletePost: async (req, res) => {
        console.log('delete post', req.params.id);
      
        try {
          const result = await Post.deleteOne({ _id: Object(req.params.id) });
          if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Post not found' });
          }
          res.json({ message: 'Post deleted successfully' });
        } catch (error) {
          console.log('error', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
}



