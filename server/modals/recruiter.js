import mongoose from 'mongoose';

const recruiterSchema = mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String},
    isRecruiter: {type: String, required: true}
});


export default mongoose.model('Recruiter',recruiterSchema);