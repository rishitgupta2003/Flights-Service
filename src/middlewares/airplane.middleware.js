const { StatusCodes } = require("http-status-codes");
const { asyncHandler, ApiError, ApiResponse } = require("../utils");
const { Logger } = require("../config");

const createCreateRequest = asyncHandler(
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

const updateRequest = asyncHandler (
    async (req, res, next) => {
        if(!req.body.id || !req.body.data){
            Logger.error("Data Format not Correct : {id, data}",{});
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Data Format not Correct : {id, data}"
            );
        }
        next();
    }
)

module.exports = {
    createCreateRequest,
    updateRequest
}