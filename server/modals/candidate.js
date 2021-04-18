import mongoose from 'mongoose';

const candidateSchema = mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String},
    isCandidate: {type: String , required: true}
});


export default mongoose.model('Candidate',candidateSchema);