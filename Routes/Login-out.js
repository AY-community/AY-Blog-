const express = require( "express");
const Router = express.Router();
const {restrictAuth}  = require("../middlewares/protectionRoute")
const {logout , login , searchPassword ,  OTP , resetPassword}  = require("../Controllers/Login-outControllers")


Router.post("/logout", logout);

Router.post("/login", login);
Router.get("/login" , restrictAuth , async (req , res) =>{
  return res.status(200).json({success:"user not logged in"})
}
)


Router.post("/ResetSearchPassword" , searchPassword);
Router.get("/ResetSearchPassword" , restrictAuth , async(req ,res) => {
  return res.status(200).json({success:"user not logged in"});
});


Router.post("/OTP"  , OTP)
Router.get("/OTP"  , restrictAuth , async(req , res)=>{
  return res.status(200).json({success:"user not logged in"})

})



Router.post("/Reset/:resetToken" , resetPassword )
Router.get("/Reset/:resetToken" ,  restrictAuth , async(req , res)=>{
  return res.status(200).json({success:"user not logged in"})

})




  module.exports = Router;
