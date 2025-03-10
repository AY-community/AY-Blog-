const mongoose = require("mongoose");


// SCHEMA + MODELS
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,

  },

  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    },
  
    picture: { 
        type: String,
        required: true }, 

        likes: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: [] },



       category:{
         type: String  
      },

      
    author:{
      type: String,
      default:"Admin" 
    }


});





const Post =  mongoose.model("Post", postSchema);

module.exports = Post

