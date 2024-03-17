import db from '../config/db.js';

class Jobs {
    static async postContactInfo({ name, email, phone, category, description }) {
        
        const insertInfo = `INSERT INTO jobs (name, email, phone, category, description) VALUES (?, ?, ?, ?, ?)`;

        const [postJob, _] = await db.query(insertInfo, [name, email, phone, category, description]);
        return postJob;
      };
    
    static async getJobs(){
        const select = 'SELECT * FROM jobs WHERE deleted_on IS NULL';
        const [getJobs, _] =  await db.execute(select);
        return getJobs;
    };

    static async deleteVideo(id){
        const update = 'UPDATE jobs SET deleted_on = CURRENT_TIMESTAMP WHERE id = ?';
        const [softDelete, _] = await db.query(update, [id]);
        console.log("¯\_( ͡° ͜ʖ ͡°)_/¯", softDelete);
        return softDelete;
    }
}

export default Jobs;