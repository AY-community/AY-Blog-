const User = require("../Models/User");
const crypto = require("crypto");
const sendMail = require("../config/sendMail");
const bcrypt = require("bcrypt");

function errorSending(err) {
  console.log(err.message, err.code);
  let error = { userName: "", email: "" };

  //HANDLE UNIQUE ERRORS
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    error[field] = `${field} already exists`;
  }
  if (err.message.includes("user validation failed")) {
    const objectValues = Object.values(err.errors);
    objectValues.map((propreties) => {
      error[propreties.path] = propreties.message;
    });
  }
  return error;
}

const signup = async (req, res) => {
  const { userName, email } = req.body;

  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 3600 * 1000;
    const newUser = await User.create({
      userName,
      email,
      verificationToken: verificationToken,
      verificationTokenExpires: expiresAt,
      verification: false,
    });
    const verificationLink = `http://localhost:5173/verify/${verificationToken}`;
    await sendMail(
      email,
      "Enter a password",
      `<p>Click the link below to set your password:</p>  <a href="${verificationLink}">Verify Email</a>`
    );

    res.status(201).json({ message: "User created succsesfully" });
  } catch (err) {
    const error = errorSending(err);
    res.status(400).json({ error });
  }
};

const addPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!password || password.length < 6 || password.length > 18) {
      return res
        .status(400)
        .json({ error: "Your password must be between 6 and 18 characters long. Please ensure it meets the required criteria." });
    }

    if (!user) {
      return res.status(404).json({ error: "The token you provided is either invalid or has expired. Please request a new one to proceed." });
    }

    if (user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({ error: "The token has expired. Please request a new one to continue with the verification process." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    user.verification = true;
    await user.save();
    return res.status(200).json({ message: " password added succesfully" });
  } catch (err) {
    res.status(500).json({ message: "A server error has occurred while processing your request. Please try again later or contact support." });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    if (user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({ message: "Token has expired" });
    }

    res.status(200).json({ message: "Token is valid", email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, addPassword, verifyToken };
