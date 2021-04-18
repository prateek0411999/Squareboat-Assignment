import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import candidateRoute from './routes/candidateRoute.js';
import recruiterRoute from './routes/recruiterRoute.js';
import jobsRoute from './routes/jobsRoute.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors());

app.use('/candidate', candidateRoute);
app.use('/recruiter',recruiterRoute);
app.use('/jobs', jobsRoute);
const PORT= process.env.PORT || 5000;

mongoose.connect(process.env.Connection_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        app.listen(PORT , ()=> {console.log(`server running on port: ${PORT}`)})
    })
    .catch(()=>{
        console.log('error occured')
        mongoose.set('useFindAndModify',false);
    })

