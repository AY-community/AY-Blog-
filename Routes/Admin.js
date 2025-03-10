const express = require( "express");
const Router =  express.Router();
const{adminAdd , deletePost} = require("../Controllers/AdminControllers");
const {restrictAdmin} = require("../middlewares/protectionRoute")
const upload = require("../config/multer");

Router.get("/adminAdd"  , restrictAdmin  ,(req , res) => {
  res.status(200).json({message:"you are the admin"})
  })
  
Router.post("/adminAdd" , upload.single("picture")    , adminAdd)
   
  Router.delete("/DeletePost"    , deletePost)


  Router.get("/DeletePost"  , restrictAdmin  , (req , res) => {
    res.status(200).json({message:"done"})
  })

  module.exports = Router;