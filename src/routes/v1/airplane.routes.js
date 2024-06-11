const express = require("express");
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");
const router = express.Router();

router.route('/').post(AirplaneMiddleware.createCreateRequest, AirplaneController.createAirplane);

module.exports = router;