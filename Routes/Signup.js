const express = require( "express");
const Router = express.Router();
const {signup} = require("../Controllers/SignupControllers")
const {addPassword} = require("../Controllers/SignupControllers")
const {verifyToken} = require("../Controllers/SignupControllers")
const {restrictAuth} = require("../middlewares/protectionRoute")



Router.post("/SignUp" , restrictAuth  , signup)
Router.get("/SignUp" , restrictAuth , (req,res) => res.status(200).json({message:"signup"}))

Router.post("/addpassword/:token" , restrictAuth,  addPassword )

Router.get("/addpassword/:token" , restrictAuth , (req,res) => res.status(200).json({message:"addpassword"}))

Router.get("/emailwaiting" , restrictAuth , (req,res) => res.status(200).json({message:"emailwaiting"}))

Router.get("/verify/:token" , restrictAuth,verifyToken )
  
    


    
    module.exports = Router;
