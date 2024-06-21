const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");
const router = express.Router();

router.route('/').post(FlightMiddleware.validateCreateRequest, FlightController.createFlight);

module.exports = router;