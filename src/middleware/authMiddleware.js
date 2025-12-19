import jwt from "jsonwebtoken";

// This middleware checks whether the request contains a valid JWT token
const authMiddleware = (req,res,next) => {

    // Read Authorization header from incoming request
    const authHeader   = req.headers.authorization;

      // Validate presence and format of Bearer token
    if(!authHeader || !authHeader.startsWith("Bearer")) {

        return res.status(401).json({message:"Token missing,No authorization"});
    }

     // Extract token from "Bearer <token>" format
    const token =  authHeader.split(" ")[1];

    try {

         // Verify token using JWT secret and decode payload
         const decoded = jwt.verify(token,process.env.JWT_SECRET);
         // Attach decoded user data to request object
         req.user = decoded;
            // Pass control to next middleware or controller
         next();


    } catch(error) {

        res.status(401).json({message:"Invalid token,not authorization"});
    }
};

export default authMiddleware;