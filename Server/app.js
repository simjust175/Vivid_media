import express from 'express';
const app = express();
let port = process.env.PORT || 3344;

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import video from './Routes/router.js';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/videos', video);


app.listen(port,  ()=> {
    console.log(`VividMedia server running on port: ${port}`);
});