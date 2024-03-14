import mysql2 from 'mysql2';
import {config} from 'dotenv';
config();

const db_config  = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3333
};

const pool = mysql2.createPool(db_config);


export default pool.promise();