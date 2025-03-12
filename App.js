//IMPORT MODULES + CONNECT DATABASE
const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(`${process.env.MONGO_URI}` )
.then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

  

const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // This is REQUIRED for cookies to work

  })
);

//ROUTES
app.use(cookieParser());
const authRouter = require("./Routes/Auth");
const signupRouter = require("./Routes/Signup");
const login_outRouter = require("./Routes/Login-out");
const PostRouter = require("./Routes/Admin");
const BlogRouter = require("./Routes/Blogs");
//CONFIG FILES
const initializePassport = require("./config/passport");
//MIDDLEWARES
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, "Views" , "dist")));
app.use(express.urlencoded({ extended: true }));


app.use(passport.initialize());
app.use("/", authRouter);
app.use("/", signupRouter);
app.use("/", login_outRouter);
app.use("/", PostRouter);
app.use("/", BlogRouter);

//RENDER

app.get("*" , (req , res)=>{
  res.sendFile(path.join(__dirname, "Views" , "dist" , "index.html"))
})


// Enable CORS for all origins

//CONFIG EXCUTION
initializePassport();

//GET STARTED ROUTE
app.get('/home' , async (req,res) => {
  try{
    const token = req.cookies.token;
    if(!token){return res.status(401).json({valid: false , message: "No token provided"})}

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {return res.status(403).json({ valid: false  , message: "Invalid token"});}
    else{
    return res.status(200).json({ valid: true, user: decoded });}
  }
);
} catch(err){
  res.status(500).json({valid:false})
}})






















