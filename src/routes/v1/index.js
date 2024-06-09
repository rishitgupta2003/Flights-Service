const express = require("express");
const { info } = require("../../controllers");
const router = express.Router();


router.route('/server-status').get(info);

module.exports = router;