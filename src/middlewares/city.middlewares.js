const { asyncHandler, ApiError } = require("../utils");
const { Logger } = require("../config");
const { StatusCodes } = require("http-status-codes");

const validationCreateUpdateCityRequest = asyncHandler (
    async (req, res, next) => {
        if(!req.body.cityName){
            Logger.error("Name Not Available", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "City Name Not Available"
            );
        }

        if(!isNaN(req.body.cityName)){
            Logger.error("City Name Cannon be a Number", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "City Name Cannot be A number"
            );
        }

        next();
    }
);

module.exports = {
    validationCreateUpdateCityRequest
}