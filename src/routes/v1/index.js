const express = require("express");
const { InfoController } = require("../../controllers")
const airplaneRoutes = require('./airplane.routes');
const cityRoutes = require("./city.routes");
const airportRoutes = require("./airport.routes");
const flightRoutes = require("./flight.routes");
const router = express.Router();



router.use('/airplanes', airplaneRoutes);
router.use('/city', cityRoutes);
router.use('/airport',airportRoutes);
router.use('/flight',flightRoutes);
router.route('/server-status').get(InfoController.info);

module.exports = router;