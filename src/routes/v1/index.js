const express = require("express");
const { InfoController } = require("../../controllers")
const router = express.Router();


router.route('/server-status').get(InfoController.info);

module.exports = router;