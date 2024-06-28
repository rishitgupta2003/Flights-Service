const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");
const router = express.Router();

router.route('/').post(FlightMiddleware.validateCreateRequest, FlightController.createFlight);
router.route('/filter').get(FlightController.getAllFlights);
router.route('/:id').get(FlightController.getFlight);
router.route('/:id/seats').patch(FlightController.updateSeats);

module.exports = router;