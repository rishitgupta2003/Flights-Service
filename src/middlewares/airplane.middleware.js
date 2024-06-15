const { StatusCodes } = require("http-status-codes");
const { asyncHandler, ApiError } = require("../utils");
const { Logger } = require("../config");

const validateCreateRequest = asyncHandler(
    async (req, res, next) => {
        if(!req.body.modelNumber){
            Logger.error("Model Number not Available",{});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Model Number not available"
            );
        }
        next();
    }
);

const validateUpdateRequest = asyncHandler (
    async (req, res, next) => {
        if(!req.params.id){
            Logger.error("ID Not Available",{});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "ID NOT AVAILABLE"
            )
        }

        if(!req.body.capacity && !isNaN(req.body.capacity)){
            Logger.error("Capacity Format is Wrong",{});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Capacity Format is Wrong"
            );
        }
        next();
    }
)

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}