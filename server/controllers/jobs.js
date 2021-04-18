import mongoose from 'mongoose';
import Jobs from '../modals/jobs.js';
import Candidate from '../modals/candidate.js'

export const listJobs = async(req,res) =>{
    try {
        const allJobs = await Jobs.find();
        console.log(allJobs);
        res.status(200).json(allJobs)
    }
    catch(error){
        res.status(404).json({
            message: error.message
        })
    }
    
};
export const createJob = async(req,res) =>{
    const {jobTitle, salary, location, companyName, recruiter} = req.body;
    try {
        const newJob = await Jobs.create({jobTitle, salary, location, companyName, recruiter});
        console.log('job created', newJob);
        res.status(200).json(newJob);
    }
    catch(error){
        res.status(404).json({
            message: error.message
        })
    }
    
};

export const applyJob = async(req,res) =>{
    const {email, jobId} = req.body;
    try {
        const candidate = Candidate.find({email});
        const updatedJob = await Jobs.update({_id: jobId}, { $push: { candidates: candidate}});
        console.log('job created', updatedJob);
        res.status(200).json(newJob);
    }
    catch(error){
        res.status(404).json({
            message: error.message
        })
    }
    
};