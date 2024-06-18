const { asyncHandler, ApiError } = require("../utils");
const { Logger } = require("../config");
const { StatusCodes } = require("http-status-codes");

const validateCreateRequest = asyncHandler(
    (req,res,next) => {
        if(!req.body.name){
            Logger.error("Name not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Name not found in Request"
            );
        }
        if(!req.body.code){
            Logger.error("Code not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Code Not Found in Request"
            );
        }
        if(!req.body.cityId){
            Logger.error("CityID not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "City ID Not Found in Request"
            );
        }
        next();
    }
)

const validateUpdateRequest = asyncHandler(
    (req,res,next) => {
        if(!req.body.name  && !req.body.code && !req.body.cityId){
            Logger.error("Empty Data Sent in Incomming Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Empty Data Sent in Incomming Request"
            );
        }
        if(req.body.cityId && isNaN(req.body.cityId)){
            Logger.error("CityId is not Integer in the incoming request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "CityId is not Integer in the incoming request"
            );
        }
        next();
    }
)

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
};