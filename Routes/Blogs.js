const express = require( "express");
const Router =  express.Router();
const Post = require("../Models/Post")
const {verifyJWT} = require("../middlewares/protectionRoute")
const {blogGet , reviews , reviewPost } = require("../Controllers/BlogsControllers")


Router.get('/Blogs' ,verifyJWT , blogGet);
Router.get('/reviews' , verifyJWT ,reviews);
Router.post('/reviews' , reviewPost)
Router.post("/like" , verifyJWT , async (req,res) => {
    const id = req.user.id;
 
    const postId = req.body.postId;
 
    
 
    const likedPost = await Post.findById( postId );
    if (!likedPost) {
      return res.status(404).json({ message: "Post not found" });
  }

    const isLiked = likedPost.likes.includes(id); 
 
    if(isLiked){
     await Post.findByIdAndUpdate(postId, {$pull: {likes: id}});
   }
   else{
     await Post.findByIdAndUpdate(postId, {$push: {likes: id}});
   }
 
 
   const updatedPost = await Post.findById(postId);
   const likeNumber = updatedPost.likes?.length; 
 
 
   res.status(200).json({liked: !isLiked , likeNumber: likeNumber  })
 
    
 
 

 
 
 
 
 })
 
 Router.get("/like", verifyJWT, async (req, res) => {
   const id = req.user.id;
 
   const allPosts = await Post.find({}); 
 
   const likedStatuses = allPosts.map((post) => ({
       postId: post._id,
       liked:Array.isArray(post.likes) ? post.likes.includes(id) : false,
       likeNumber: Array.isArray(post.likes) ? post.likes.length : 0
   }));
 
   res.status(200).json({ likes: likedStatuses });
 });
 


  
module.exports = Router;