const express = require( "express");
const Router =  express.Router();
const passport =require("passport")
const {authWarning , authStatus , LoginAuth, deleteUser}= require("../Controllers/AuthControllers")


  Router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"]  , prompt: "select_account" ,  session: false}));
  Router.get("/auth/status", authStatus);
  // Redirect to Facebook login
  Router.get("/auth/facebook", authWarning , passport.authenticate("facebook", { scope: ["email"] , callbackURL: "https://17d9-197-206-50-94.ngrok-free.app/auth/facebook/callback" , session: false} )
  );
// Facebook Callback
  Router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/login" , session: false}) ,
    LoginAuth
    );
  


  Router.get("/google/auth/redirect",
    passport.authenticate("google", { failureRedirect: "/",  session: false } ),
    LoginAuth


  );

  Router.get("/delete-my-data", deleteUser);

  module.exports = Router;
