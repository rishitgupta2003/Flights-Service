const express = require("express");
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");
const router = express.Router();

router.route('/').post(AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane);
router.route('/').get(AirplaneController.getAirplanes);
router.route('/:id').patch(AirplaneMiddleware.validateUpdateRequest, AirplaneController.updateFlight);
router.route('/:id').get(AirplaneController.getAirplane);
router.route('/:id').delete(AirplaneController.deleteAirplane);

module.exports = router;