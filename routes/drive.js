const express = require('express')
const router = express.Router()

const driveController = require('../controllers/driveController')

router.post('/get-all-folder', driveController.getAllFolder)
router.post('/create-folder', driveController.createFolder)
router.post('/save-file', driveController.saveFile)
router.post('/delete-folder', driveController.deleteFolder)

module.exports = router;