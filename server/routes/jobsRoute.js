import express from 'express';
import {listJobs, createJob, applyJob} from '../controllers/jobs.js';
import Auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/list',listJobs);
router.post('/create', Auth, createJob);
router.post('/apply',Auth,applyJob);

export default router;