const jwt = require("jsonwebtoken");



const authWarning = (req, res, next) => {
    res.setHeader("ngrok-skip-browser-warning", "true");
    next();
  }

  const authStatus = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ user: decoded });
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

  const LoginAuth =     (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
  
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
      sameSite: "Lax",
    });
        res.redirect("http://localhost:5173/Blogs"); 
      }

const deleteUser = (req, res) => {
    res.status(200).send(`
        <h2>Data Deletion Instructions</h2>
        <p>If you wish to delete your data, please contact us at support@email.com with your request.</p>
    `);
  }





  module.exports = {authWarning , authStatus , LoginAuth , deleteUser}