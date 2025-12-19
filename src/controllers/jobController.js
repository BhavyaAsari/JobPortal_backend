import Job from "../models/Job.js";

// Returns a list of all available jobs sorted by latest first
export const getAllJobs = async (req, res) => {
  try {
     // Fetch all jobs from database and sort by creation date (newest first)
    const jobs = await Job.find().sort({ createdAt: -1 });

     // Send job list along with total count
    res.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
       
    // Generic error handling for database or server issues
    res.status(500).json({ message: "Server error" });
  }
};