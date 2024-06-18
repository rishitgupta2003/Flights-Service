const express = require("express");
const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");
const router = express.Router();

router.route('/').post(AirportMiddleware.validateCreateRequest, AirportController.createAiport);
router.route('/').get(AirportController.getAirports);
router.route('/:id').get(AirportController.getAirport);
router.route('/:id').delete(AirportController.deleteAirport);
router.route('/:id').patch(AirportMiddleware.validateUpdateRequest, AirportController.updateAirport);
module.exports = router;