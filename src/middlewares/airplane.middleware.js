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


module.exports = {
    createCreateRequest,
}