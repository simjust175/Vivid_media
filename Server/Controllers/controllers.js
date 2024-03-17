import Service from '../Service/service.js';

class Controllers {

    static async postVideo({ body }, res) {
        try {
            const addNew = await Service.postVideo(body);
            if (!addNew) res.status(400).json({Oops:"We cant seem to find what you are looking for"});
            res.status(200).json({ Congratulations: `New video ${body.url} added successfully`, addNew });
        } catch (error) {
            res.status(500).json({ Error: `Controllers: Cannot post video: ${error.message}` });
        };
    };

    static async getVideos(req, res) {
        try {
            const videos = await Service.getVideos();
            console.log("success ", videos);
            if (!videos) res.status(400).json({Oops:"We cant seem to find what you are looking for"});
            res.status(200).json({ videos });
        } catch (error) {
            res.status(500).json({ Error: `Controllers: Cannot get videos: ${error.message}`});
        };
    };

    static async deleteVideo({ params }, res) {
        try {
            const videos = await Service.deleteVideo(params.id);
            if (!videos) res.status(400).json({Oops:"We cant seem to find what you are looking for"});
            console.log("success ", videos);
            res.status(200).json({ "Success": "Video deleted", videos });
        } catch (error) {
            res.status(500).json({ Error: `Controllers: Cannot delete video: ${error.message}`});
        };
    };

}

export default Controllers;