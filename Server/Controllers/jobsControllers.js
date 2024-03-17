import JobsService from '../Service/jobsService.js';

class JobsControllers {

    static async postJob({ body }, res) {
        try {
            const addNew = await JobsService.postJob(body);
            if (!addNew)  res.status(400).json({Oops:"We cant seem to find what you are looking for"}); 
            res.status(200).json({ Congratulations: `New job ${body.name} added successfully`, addNew });
        } catch (error) {
            res.status(500).json({ Error: `Controllers: Cannot post job: ${error.message}` });
        };
    };

    static async getJobs(req, res) {
        try {
            const jobs = await JobsService.getJobs();
            if (!jobs) res.status(400).json({Oops:"We cant seem to find what you are looking for"}) 
            res.status(200).json({ jobs });
        } catch (error) {
            res.status(500).json({ Error: `Controllers: Cannot get jobs: ${error.message}`});
        };
    };

    static async deleteJob({ params }, res) {
        try {
            const deleteJob = await Service.deleteJob(params.id);
            console.log("success ", jobs);
            if (!deleteJob) res.status(400).json({Oops:"We cant seem to find what you are looking for"}); 
            res.status(200).json({ "Success": "job deleted", jobs });
        } catch (error) {
            res.status(500).json({ Error: `Controllers: Cannot delete job: ${error.message}`});
        };
    };

}

export default JobsControllers;