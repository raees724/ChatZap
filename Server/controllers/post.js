// import Post from '../models/Post.js';
// import cloudinary from '../config/cloudinery.js';

// const Post = require('../models/Post.js');
const  Post  = require('../models/post');
const  Notification  = require('../models/Notification');
// const   Cloudinary = require('../config/cloudinary.js');
const   cloudinary = require('../config/cloudinary.js');
const { response } = require('express');


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
                .populate('author', 'username profilePicture')
                .populate('comments.author', 'username profilePicture')
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
                .populate('author', 'username profilePicture')
                .populate({
                    path: 'comments',
                    populate: { path: 'author', select: 'username profilePicture' },
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
                const notification = new Notification({
                    type: "like",
                    user: post.author,
                    friend: loggedInUserId,
                    postId: post._id,
                    content: 'Liked your post'
                })
                await notification.save();
            }
    
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { likes: post.likes },
                { new: true }
            );
    
            const populatedPost = await Post.findById(updatedPost._id)
                .populate('author', 'username profilePicture')
                .populate('comments.author', 'username profilePicture')
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
           const notification = new Notification({
            type: "Comment",
            user: post.author,
            friend: loggedInUserId,
            postId: post._id,
            content: 'commented on your post'
        })
        await notification.save();
           const savedPost = await post.save();
           
           const populatedPost = await Post.findById(savedPost._id)
               .populate('author', 'username profilePicture')
               .populate({
                   path: 'comments',
                   populate: { path: 'author', select: 'username profilePicture' },
                   options: { sort: { createdAt: -1 } }
               })
               .exec();
    
           res.status(201).json(populatedPost);
       } catch (err) {
           res.status(404).json({ message: err.message });
       }
    },
    

    getUserPost : async (req, res) => {

    
    try{
        let id = req.params.id;
        console.log('ddd ',id)
    const posts = await Post.find({author:id})
    .populate('author', 'username profilePicture')
               .populate({
                   path: 'comments',
                   populate: { path: 'author', select: 'username profilePicture' },
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

          const posts = await Post.find();

          console.log(posts,"response data")
           
        //   res.json({ message: 'Post deleted successfully' });
          res.status(200).json(posts)

          
        } catch (error) {
          console.log('error', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      },

 //Report Post 
    // reportPost: async (req, res) => {
    //     console.log("Reporteddddddddddddddddddd")
    //     console.log('report post', req.params.id);
    //     console.log('report post', req.params.reason);
    //     console.log("77777777777888888888777777777888888888");
    //     const reason = req.params.reason
    //     try {
    //     const post = await Post.findById(req.params.id);
    //     const result = await Post.findByIdAndUpdate({ _id: Object(req.params.id) },{
    //         $set:{isReported : true}
    //     });

    //     const value = post.isReported
    //     console.log("Value inside is repoerted os :",value)
    //     // const isRepo = post.isReported.includes("true");

    //     if(post.isReported === true) {
    //         post.reports.push(reason);
    //         await post.save();                                          
    //     }
    //     console.log("Array of reports os :" ,post.reports)

    //       console.log("Reportessresult",result.isReported)

          
    //       console.log("The Reason Wasssss:",reason)
          
    //       res.json({ message: 'Post deleted successfully' });
    //     //   res.json({ data: reason });
    //     } catch (error) {
    //       console.log('error', error);
    //       res.status(500).json({ message: 'Internal server error' });
    //     }
    //   },

    // reportPost: async (req, res) => {
    //     const postId = req.params.id;
    //     const reason = req.params.reason;
      
    //     try {
    //       const post = await Post.findById(postId);
      
    //       if (post.isReported) {
    //         return res.status(400).json({ message: 'Post already reported' });
    //       }
      
    //       const updatedPost = await Post.findByIdAndUpdate(
    //         postId,
    //         { isReported: true, $push: { reports: reason } },
    //         { new: true }
    //       );
      
    //       res.json({ message: 'Post reported successfully', post: updatedPost });
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).json({ message: 'Internal server error' });
    //     }
    //   },

    reportPost: async (req, res) => {
        const postId = req.params.id;
        const reason = req.params.reason;
        try {
          const post = await Post.findById(postId);
          if (!post) {
            return res.status(404).json({ message: "Post not found" });
          }
          await Post.findByIdAndUpdate(postId, { isReported: true });
          if (!post.isReported) {
            post.isReported = true;
            post.reports = [reason];
          } else if (!post.reports.includes(reason)) {
            post.reports.push(reason);
          }
          await post.save();
          res.json({ message: "Post reported successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      },
      
      

      
}



