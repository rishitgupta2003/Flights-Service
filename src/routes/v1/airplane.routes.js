const express = require("express");
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");
const router = express.Router();

router.route('/').post(AirplaneMiddleware.createCreateRequest, AirplaneController.createAirplane);
router.route('/').get(AirplaneController.getAirplanes);
router.route('/').patch(AirplaneMiddleware.updateRequest, AirplaneController.updateFlight);
router.route('/:id').get(AirplaneController.getAirplane);
router.route('/:id').delete(AirplaneController.deleteAirplane);

module.exports = router;