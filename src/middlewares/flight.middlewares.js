const { asyncHandler, ApiError } = require("../utils");
const { Logger } = require("../config");
const { StatusCodes } = require("http-status-codes");

const validateCreateRequest = asyncHandler(
    (req,res,next) => {
        if(!req.body.flightNumber){
            Logger.error("flightNumber not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "flightNumber not found in Request"
            );
        }
        if(!req.body.airplaneId){
            Logger.error("airplaneId not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "airplaneId Not Found in Request"
            );
        }
        if(!req.body.departureAirportId){
            Logger.error("departureAirportId not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "departureAirportId Not Found in Request"
            );
        }
        if(!req.body.arrivalAirportId){
            Logger.error("arrivalAirportId not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "arrivalAirportId Not Found in Request"
            );
        }
        if(!req.body.departureTime){
            Logger.error("departureTime not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "departureTime Not Found in Request"
            );
        }
        if(!req.body.arrivalTime){
            Logger.error("arrivalTime not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "arrivalTime Not Found in Request"
            );
        }
        if(!req.body.price){
            Logger.error("price not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "price Not Found in Request"
            );
        }
        if(!req.body.boardingGate){
            Logger.error("boardingGate not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "boardingGate Not Found in Request"
            );
        }
        if(!req.body.totalSeats){
            Logger.error("totalSeats not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "totalSeats Not Found in Request"
            );
        }
        next();
    }
)

const validateUpdateRequest = asyncHandler(
    (req,res,next) => {
        if(!req.body.seats){
            Logger.error("seats not found in Request", {});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "seats Not Found in Request"
            );
        }
        next();
    }
)

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
};