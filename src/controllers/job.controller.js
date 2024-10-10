import { Job } from "../models/job.model.js";
import {User} from '../models/user.model.js';
import mongoose from "mongoose";

//recruiter post job 
export const postJob = async (req, res) => {
    try {
        const { title, description,category, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
console.log(req.body)
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            category,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// get all job
export const getAllJobs = async (req, res) => {
    const { location, category, salary, keyword } = req.query;

    // Build the query based on filters
    let query = {};

    // Apply filters if they exist
    if (location) query.location = { $regex: location, $options: 'i' };  // Case-insensitive regex search
    if (category) query.category = { $regex: category, $options: 'i' };  // Case-insensitive regex search
    if (salary) query.salary = { $gte: salary };
    if (keyword) query.title = { $regex: keyword, $options: 'i' };  // Case-insensitive search for title

    console.log('Query Object:', query);

    try {
        // Get all jobs matching the query (without pagination)
        const jobs = await Job.find(query)
            .populate({ path: "company" })  // Populate company data
            .sort({ createdAt: -1 });  // Sort by most recent jobs

        const totalJobs = jobs.length;  // Get the total number of jobs found
        console.log(totalJobs)
        // Return the jobs and the total number of jobs
        return res.status(200).json({
            jobs,
            totalJobs,
            success: true
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};


// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params?.id;
        console.log(jobId)
      
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// recruiter job by recruiter id - protected
export const getRecruiterJobs = async (req, res) => {
    try {
        const recruiterId = req.id;
        const jobs = await Job.find({ created_by: recruiterId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}



// Save Job
export const saveJob = async (req, res) => {
    try {
      const { userId, jobId } = req.body;
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: 'Invalid userId or jobId format' });
      }
      
      
      // Log to check if userId and jobId are correct
      console.log("Received userId:", userId, "jobId:", jobId);
  
      // Validate userId and jobId
      if (!userId || !jobId) {
        return res.status(400).json({ message: 'Missing userId or jobId' });
      }
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check if the job is already saved
      if (user?.savedJobs.includes(jobId)) {
        return res.status(400).json({ success:false, message: 'Job already saved' });
      }
  
      // Save the job
      user.savedJobs.push(jobId);
      await user.save();
      console.log('Job saved successfully');
      res.status(200).json({ message: 'Job saved successfully' });
  
    } catch (error) {
      console.error('Error saving job:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  // Unsave Job
  export const unsaveJob = async (req, res) => {
    try {
      const { userId, jobId } = req.body;
      console.log('unsaved job call', userId, jobId);
  
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: 'Invalid userId or jobId format' });
      }
  
      // Log to check if userId and jobId are correct
      console.log("Received userId:", userId, "jobId:", jobId);
  
      // Check for missing userId or jobId
      if (!userId || !jobId) {
        return res.status(400).json({ message: 'Missing userId or jobId' });
      }
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Unsave the job by filtering it out
      user.savedJobs = user.savedJobs.filter((savedJob) => savedJob.toString() !== jobId.toString());
      
      await user.save();
      console.log('Job unsaved successfully');
      res.status(200).json({ message: 'Job unsaved successfully' });
  
    } catch (error) {
      console.error('Error unsaving job:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  export const isJobSaved = async (req, res) => {
    try {
      const { userId, jobId } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: 'Invalid userId or jobId format' });
      }
  
      const user = await User.findById(userId);
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isSaved = user.savedJobs.includes(jobId);
  
      res.status(200).json({ isSaved });
    } catch (error) {
      console.error('Error checking saved job status:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getSavedJobs = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log('save job get', userId);
  
      // Fetch the user's saved jobs and populate company info
      const user = await User.findById(userId.toString())
        .populate({
          path: 'savedJobs',
          populate: {
            path: 'company',
            model: 'Company',
          },
        });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Format the saved jobs data
      const formattedSavedJobs = user.savedJobs.map((job) => ({
        _id: job._id,
        title: job.title,
        description: job.description,
        requirements: job.requirements, // Array of requirements
        salary: job.salaryRange,
        applications: job.applications, // Assuming you have an `applications` field
        category: job.category, // Assuming `category` is a string in your Job model
        company: {
          _id: job.company._id,
          name: job.company.name,
          logo: job.company.logo,
          location: job.company.location,
          userId: job.company.userId,
          createdAt: job.company.createdAt,
          updatedAt: job.company.updatedAt,
        },
        createdAt: job.createdAt,
        created_by: job.created_by,
        experienceLevel: job.experienceLevel,
        jobType: job.jobType,
        location: job.location,
        position: job.position,
        updatedAt: job.updatedAt,
        __v: job.__v,
      }));
  
      res.status(200).json({ savedJobs: formattedSavedJobs });
    } catch (error) {
      console.error('Error fetching saved jobs:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  