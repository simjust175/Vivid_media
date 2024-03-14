import Admin from '../Database/models/Admin.js';

class Service {
    static async postVideo(body){
        try {
            const post = await Admin.insertVideo(body);
            return post;
        } catch (error) {
            throw new Error(error);
        }
    };

    static async getVideos(){
        try {
            const get = await Admin.getVideos();
            return get;
        } catch (error) {
            throw new Error(error);
        }
    };

    static async deleteVideo(id){
        try {
            const update = await Admin.deleteVideo(id);
            return update;
        } catch (error) {
            throw new Error(error);
        }
    };

    // create a method to check for recurring clients!
    static async postJob(body){
        try {
            const post = await Admin.insertVideo(body);
            return post;
        } catch (error) {
            throw new Error(error);
        }
    };
}

export default Service;