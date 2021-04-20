import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobsSchema = mongoose.Schema({

    id: { type: String },
    jobTitle: { type: String, required: true },
    salary: { type: String, required: true },
    location: { type: String, required: true },
    companyName: { type: String },
    recruiter: { type: Schema.Types.ObjectId, required: true },
    candidates: { type: Array }

});


export default mongoose.model('Jobs', jobsSchema);