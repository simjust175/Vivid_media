import Jobs from '../Database/models/Jobs.js';

class JobsService {
    static async postJob(body){
        try {
            const post = await Jobs.postContactInfo(body);
            return post;
        } catch (error) {
            throw new Error(error);
        }
    };

    static async getJobs(){
        try {
            const get = await Jobs.getJobs();
            if(!get) return null;
            return get;
        } catch (error) {
            throw new Error(error);
        }
    };

    static async deleteJob(id){
        try {
            const update = await Admin.deleteJob(id);
            return update;
        } catch (error) {
            throw new Error(error);
        }
    };

    // create a method to check for recurring clients!

}

export default JobsService;