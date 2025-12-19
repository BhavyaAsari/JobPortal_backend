
// Controller responsible for handling job applications and application history
import Application from "../models/Application.js";
import Job from "../models/Job.js";

// Allows an authenticated user to apply for a job with resume upload
export const jobApplication = async (req,res ) => {

try {

    const jobId = req.params.jobId;
    const userId = req.user.id;

    // Validate resume upload (handled by Multer middleware)

    if(!req.file) {

        return res.status(400).json({message:"Resume file is required"});
    }

    // Check whether the job exists before applyin
    const job = await Job.findById(jobId);

    if(!job) {

        return res.status(404).json({message:"Job not found"});
    }

    // Create a new job application entry
    const application = await Application.create({

        user:userId,   // Reference to logged-in user
        job:jobId,    // Reference to selected job

        resume:req.file.path,
    });

    // Send success response after successful application
    res.status(201).json({message:"Job applied successfully",application});

} catch(error) {

      // Log error for debugging (important for production readiness)
     console.error("Job applied failed: ",error);
    res.status(500).json({message:"Server Error"});
   
}

};


// Fetches all applications submitted by the logged-in user
export const getMyApplication = async(req,res) => {

    try {

         // Populating job details for better response readability
        const applications = await Application.find({user: req.user.id})
        .populate("job","title company location")
        .sort({createdAt:-1});

        res.status(200).json({count:applications.length,applications,});


    } catch(error) {

        res.status(500).json({message:"Server error"});
    }
};