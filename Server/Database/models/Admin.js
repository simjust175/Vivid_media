import db from '../config/db.js';

//POST
class Models {

    static async insertVideo({url, description}){
        const insert = `INSERT INTO videos (url, description) VALUES (?, ?)`;
        const [postVideo, _] = await db.query(insert, [url, description]);
        return postVideo;
    };

    static async getVideos(){
        const select = 'SELECT * from videos WHERE deleted_on IS NULL ORDER BY updated_on DESC';
        const [getVideos, _] = await db.execute(select);
        return getVideos; 
    }

    static async deleteVideo(id){
        const update = 'UPDATE videos SET deleted_on = CURRENT_TIMESTAMP WHERE id = ?';
        const [softDelete, _] = await db.query(update, [id]);
        console.log("¯\_( ͡° ͜ʖ ͡°)_/¯", softDelete);
        return softDelete;
    }

    static async postContactInfo({name, email, number, job}){
        const insertInfo = `INSERT INTO clients (${name, email, number, job})`;
        const postJob = await db.execute(insertInfo);
        return postJob;
    }

}

export default Models;