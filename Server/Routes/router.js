import express from 'express';
import Controllers from '../Controllers/controllers.js';

const route = express.Router();

route.post('/postvideo', Controllers.postVideo);

route.get('/', Controllers.getVideos);

route.patch('/delete/:id', Controllers.deleteVideo);

export default route;