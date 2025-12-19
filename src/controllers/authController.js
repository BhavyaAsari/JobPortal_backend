import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// Registers a new user after validating input and hashing password
export const registerUser  = async (req,res) => {

 try {

         // Extract user input from request body
       const {name,email,password } = req.body;

       
        // Basic input validation
       if(!name || !email || !password) {

        return res.status(400).json({message:"All fields are  required"});
       }

        // Check if user already exists using email
       const userExists  = await User.findOne({email});

       if(userExists) {

        return res.status(409).json({message:"User already exists"});
       }

       // Hash password using bcrypt for security
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);

       const user = await User.create({

        name,
        email,
        password:hashedPassword,

       });

       
    // Send success response without exposing password
       res.status(201).json({message:"User registered successfully",user:{id:user._id,name:user.name,email:user.email},
    });

 } catch (error) {

    res.status(500).json({message:"Server error"});
 }

};


// Authenticates user credentials and returns JWT token
export const loginUser = async (req,res) => {

   try {

        // Extract login credentials
     const {email,password} = req.body;

     // Validate input
    if(!email || !password) {

        return res.status(400).json({message:"Email and Password are required"});
    }

     // Find user by email
    const user = await User.findOne({email});

    if(!user) {

        return res.status(401).json({message:"Invalid Credentials"});
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) {

        return res.status(401).json({message:"Invalid Credentials"});
    }

    
    // Generate JWT token with user ID as payload
    const token = jwt.sign(

        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );


     // Send token and basic user info
    res.status(200).json({

        message:"Login Successfully",
        token,
        user: {

            id:user._id,
            name:user.name,
            email:user.email,
        },
    });
  
} catch(error) {

    res.status(500).json({message:"Server error"});
}
    
};

