import express from 'express';
import jobsControllers from '../Controllers/jobsControllers.js';
import JobsControllers from '../Controllers/jobsControllers.js';

const route = express.Router();

route.post('/postjob', jobsControllers.postJob);

route.get('/', JobsControllers.getJobs);

route.delete('/delete', JobsControllers.deleteJob)

export default route;