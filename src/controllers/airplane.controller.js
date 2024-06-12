const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { asyncHandler, ApiResponse, ApiError } = require("../utils");

/*
    POST Method
    req_body : { modelNumber, capacity }
*/

const createAirplane = asyncHandler (
    async (req, res) => {
        try {
            const { modelNumber, capacity } = req.body;
            const airplane = await AirplaneService.createAirplane(
                {
                    modelNumber: modelNumber,
                    capacity: capacity
                }
            )

            return res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    airplane,
                    "Airplane Added Successfully"
                )
            );
        } catch (error) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                error.message,
            );
        }
    }
)

module.exports = {
    createAirplane
}