const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Post = require("../Models/Post");

const adminAdd =    async(req , res) =>{
  
    const{title , description , category } = req.body
  
  
  
      try{
      let errors = {
        title: "",
        description: "",
        picture: "",
        category:"",
      }  
      if(!title){errors.title = "title is required"}
      else if(title.length <=6){errors.title = "title is too short"}
  
  
      if(!description){errors.description = "description is required"}
      else if(description.length <=16){errors.description = "description is too short"}

      if(!category){errors.category = "category is required"}
      else if(category.length <= 1){errors.category = "Category is too short"}
  
  
      if(!req.file){errors.picture = "picture is required"}
      if (Object.values(errors).some((error) => error)) {
        return res.status(400).json(errors);
      }
  
      
      const uniquePost = await Post.findOne({title})

      if(uniquePost){
        return res.status(400).json({title:"title already exist"})
      }
  
      const filename = req.file.filename
     const newPost = await Post.create({
       title,
       description,
       picture:filename,
       category: category.toLowerCase(),
       createdAt: new Date()
     })
  
  
      return res.status(200).json({message:"post added succesfully"})
  
      }
      catch(err){
        console.log(err)
         res.status(500).json({message:"server error"})}
  
  
  }

const deletePost =       async(req , res) =>{
    const {post} = req.body
    try{
     
      if(!post){
        return res.status(400).json({message:"Please enter a valid value to confirm this action. This will permanently delete the post."})
      }
  
      let query = {};
  
      if (mongoose.Types.ObjectId.isValid(post)) {
        query._id = post; 
      } else {
        query.title = post; 
      }
      
      const postFounded = await Post.findOne( query );
  
      if (!postFounded) {
        return res.status(404).json({ message: "The post you are looking for could not be found. It may have been removed or does not exist." });
      }
      else{
        const filePath = path.join(__dirname, "../uploads", postFounded.picture);
  
        await Post.findOneAndDelete( query );
  
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);

        }
  
      }
  
  
  
      return res.status(200).json({message:"The selected post has been successfully deleted. This action is irreversible and cannot be undone."})
  
  
      
  } catch(err){ res.status(500).json({message:"A server error has occurred while processing your request. Please try again later or contact support"})}
  }

  module.exports = {
    adminAdd,
    deletePost  }