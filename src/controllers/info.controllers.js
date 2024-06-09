const { StatusCodes } = require("http-status-codes");
const { asyncHandler, ApiResponse } = require("../utils");

const info = asyncHandler(
    (req, res) => {
        res.status(StatusCodes.OK).json(
            new ApiResponse(
                StatusCodes.OK,
                "API Working"
            )
        );
    }
);

module.exports = {
    info
}