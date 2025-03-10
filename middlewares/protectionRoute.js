const jwt = require("jsonwebtoken");



const verifyJWT = (req, res, next) => {
    const token = req.cookies.token; 
    if (!token) {
       return  res.status(401).json({message:"Unauthorized"}) 
    }


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return  res.status(401).json({message:"Unauthorized"}) 
        }


        else{
            req.user = decoded; 
            if (req.user.exp < Math.floor(Date.now() / 1000)) { 
                return res.status(403).json({ message: "Unauthorized" });
             }
            next(); 
        }

    });

};



const restrictAuth = (req, res, next) => {
    const token = req.cookies?.token; // Ensure `token` exists

    if (!token) {
        return next(); // No token = user is not logged in
    }


     

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(); // Invalid token = treat as not logged in
        }

        if (decoded.exp < Math.floor(Date.now() / 1000)) { 
            return next();
        }


        return res.status(403).json({ message: "You are already logged in" });
    });
};


const restrictAdmin = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized" });
        }



        req.user = decoded; // Store user data


        if (req.user.exp < Math.floor(Date.now() / 1000)) { 
            return res.status(403).json({ message: "Unauthorized" });

         }


        const allowedAdmins = ["ayblogapp@gmail.com" , "aymenchedri@gmail.com"];

        if (!req.user.email || !allowedAdmins.includes(req.user.email)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    });


  }



module.exports = {verifyJWT , restrictAuth , restrictAdmin }
