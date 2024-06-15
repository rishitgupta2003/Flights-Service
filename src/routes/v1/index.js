const express = require("express");
const { InfoController } = require("../../controllers")
const airplaneRoutes = require('./airplane.routes');
const cityRoutes = require("./city.routes");
const router = express.Router();



router.use('/airplanes', airplaneRoutes);
router.use('/city', cityRoutes);

router.route('/server-status').get(InfoController.info);

module.exports = router;