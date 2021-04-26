const Stories = require('../models/Stories');
const ObjectId = require('mongoose').Types.ObjectId;
const { cloudinary } = require('../utils/cloudinary');

// add to storiesSchema

exports.createStory = async (req, res, next) => {
    // const file = req.file.path
    const files = req.files;

    try {
        if (req.files) {
            for (const file of files) {
                const { path } = file;
                const uplaods = await cloudinary.uploader.upload(path, {
                    use_filename: true,
                    folder: "photoshare_post",
                    resource_type: 'auto',
                })

                return res.json({ msg: "yes there is ", result: uplaods })
            }
        } else {
            return res.status(400).json({ msg: " no file has been selected" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }

}