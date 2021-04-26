const express = require('express');
const authMiddleWare = require('../../middleware/auh');
const { upload } = require('../../utils/multer');
const storyController = require('../../controllers/storiesController')

const router = express.Router();
// fetch stories
router.get('/', authMiddleWare)
router.post('/createStory', [upload.array('story', 4), authMiddleWare], storyController.createStory);

module.exports = router;