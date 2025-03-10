const Post = require("../Models/Post")
const sendMail = require("../config/sendMail")

const blogGet = async(req , res) =>{

    try{
      
  console.log("req.user:", req.user); 
      const posts = await Post.find({})
      res.status(200).json(posts)
    }catch(err){res.status(500).json({message:"server error"})}
  }

const reviews = async(req , res) =>{
  res.status(200).json({message:"reviews"})
}

const reviewPost = async(req,res) => {
  const {review} = req.body
  if(!review){
    res.status(400).json({message:"You didn't enter a review. Please share your thoughts to help us improve and enhance your experience"})
  }
 
  else{
    sendMail("ayblogapp@gmail.com", "app review" , review )
    res.status(200).json({message:"done"})
  }
}

  module.exports = {blogGet , reviews , reviewPost}