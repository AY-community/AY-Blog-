const bcrypt = require("bcrypt")
const User  = require("../Models/User")
const jwt = require("jsonwebtoken")
const sendMail = require("../config/sendMail");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");



const logout = (req, res) => {
  res.clearCookie("token"); 
  res.status(200).json({ message: "Logged out successfully" });
};

const login =  async (req, res) => {
  const { email, password } = req.body;

  let errors = {};

  
  if (!email) errors.emessage = "Please enter an email";
  if (password.length >= 18 || password.length <= 6) errors.pmessage = "invalid password"
  if (!password) errors.pmessage = "Please enter a password";


  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
}

 
  try {

    const searchedUser = await User.findOne({ email  , verification: true});

    if (!searchedUser) {
      return res.status(400).json({ emessage: " email doesnt exist" });
    }



    const isMatch = await bcrypt.compare(password, searchedUser.password);





    if (!isMatch) {
      return res.status(400).json({ pmessage: "Invalid password" });
    }





    const token = jwt.sign(
    { id: searchedUser._id, email: searchedUser.email }, 
    process.env.JWT_SECRET, 
    { expiresIn: 60 * 60 * 24 * 2 }
   )

   res.cookie("token", token, {
    httpOnly: true,  // Prevents JavaScript access
    secure: process.env.NODE_ENV === "production", // Secure in production
    maxAge: 1000 * 60 * 60 * 24 * 2, // Correct (2 days)
    sameSite: "Lax",
  });

    res.status(200).json({ message: "Login successful", user: searchedUser , token });

  } catch (err) {
    res.status(500).json({ emessage: "server error" });
  }
}

const searchPassword =  async(req , res) =>{
  const{emailSearch} = req.body
try{
  const userSearched = await User.findOne({email : emailSearch})
  if(!userSearched){
    return res.status(400).json({message:"The email you entered is incorrect or does not exist. Please check and try again."
})}

const otp = otpGenerator.generate(6, { 
  digits: true, 
  upperCaseAlphabets: false, 
  specialChars: false 
}

)

userSearched.otp = otp
userSearched.otpExpires = Date.now() + 300 * 1000;
await userSearched.save(); 

sendMail(
  userSearched.email,
  "Your Password Reset OTP",
  `<h1>Use this OTP to reset your password: <strong>${otp}</strong></h1>
   <p>This OTP will expire in 5 minutes</p>`
);


res.status(200).json({ message: "A one-time password (OTP) has been successfully sent to your registered email address. Please check your inbox." });


} catch(err){ res.status(500).json({message:"A server error has occurred while processing your request. Please try again later or contact support"})}
}


const OTP = async(req , res) =>{
  const{OTP} = req.body
  try{
  const searchedUser = await User.findOne({otp:OTP})

  if(!searchedUser){
    return res.status(404).json({message:"The OTP code you entered is invalid. Please check and try again to proceed further!"})

  }

  if(searchedUser.otpExpires < Date.now()){
    return res.status(400).json({message:"The OTP code you entered has expired. Kindly request a new one and proceed with verification."})

  }

  const token =  crypto.randomBytes(32).toString("hex");

  searchedUser.resetToken = token;
  searchedUser.resetTokenExpire = Date.now() +10 * 60 * 1000;

  searchedUser.otp = undefined;
  searchedUser.otpExpires = undefined;
  await searchedUser.save();
  res.status(200).json({token:token})

  }
  catch(err){  res.status(500).json({message:"server error"})
}
  

}
const resetPassword = async(req,res) =>{
  const {resetToken} = req.params
  const {password} = req.body

  
  if(password.length >= 18 || password.length<= 6){
   return  res.status(400).json({error:"The password you entered is invalid. Please ensure it meets the required criteria and try again."
})
  }


  try{
    const userFound = await User.findOne({resetToken: resetToken})
    if(!userFound){
      return res.status(400).json({error:"An unexpected error occurred while processing your request. Please try again or contact support."
  })}
   

  if(userFound.resetTokenExpire < Date.now()){
    return res.status(400).json({error:"The OTP code you entered has expired. Please request a new one and complete the verification process."
})
  }

  const hashedpass = await bcrypt.hash(password , 10)
  userFound.password = hashedpass;
  userFound.resetToken = undefined;
  userFound.resetTokenExpire = undefined;
  await userFound.save();



    res.status(200).json({message:"Your password has been successfully reset. You can now log in using your new credentials securely."})

  


  } catch(err){  res.status(500).json({message:"server error"})}
}

  module.exports = {logout , login , searchPassword , OTP , resetPassword}