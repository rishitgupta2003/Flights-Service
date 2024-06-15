const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");
const router = express.Router();

router.route('/').post(CityMiddleware.validationCreateUpdateCityRequest, CityController.createCity);
router.route('/').get(CityController.getCities);
router.route('/:id').patch(CityMiddleware.validationCreateUpdateCityRequest, CityController.updateCity);
router.route('/:id').get(CityController.getCity);
router.route('/:id').delete(CityController.deleteCity);

module.exports = router;