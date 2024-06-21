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

            return res.
                    status(StatusCodes.OK).
                    json(
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

/*
    GET Method
    /airplane/
    req.body : {}
*/

const getAirplanes = asyncHandler (
    async (req, res) => {
        try {
            const airplanes = await AirplaneService.getAirplanes();
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            airplanes,
                            "Fetched Airplanes Successfully"
                        )
                    );
        } catch (error) {
            throw new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }
)

/*
    GET Method
    /airplanes/:id
    req.body : {}
*/

const getAirplane = asyncHandler (
    async (req, res) => {
        try{
            const id = req.params.id;
            const airplane = await AirplaneService.getAirplane(id);
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            airplane,
                            "Fetched Details Successfully"
                        )
                    )
        }catch(error){
            throw new ApiError(
                error.status_code || StatusCodes.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }
)

/*
    DELETE Method
    /airplane/:id
    req.body: {}
*/

const deleteAirplane = asyncHandler (
    async (req, res) => {
        try{
            const id = req.params.id;
            const response = await AirplaneService.deleteAirplane(id);
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            response,
                            "Deleted Successfully"
                        )
                    )
        } catch(error){
            throw new ApiError(
                error.status_code || StatusCodes.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }
)

/*
    PATCH Method
    /airplane/:id
    req.body: {
        'fieldToChange': __,
        'newValue':__
    }
*/

const updateAirplane = asyncHandler (
    async (req, res) => {
        try {
            const id = req.params.id;
            const data = {
                id,
                data: req.body
            }
            const response = await AirplaneService.updateAirplane(data);
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            response,
                            "Airplane Updated Successfully"
                        )
                    );
        } catch (error) {
            throw new ApiError(
                error.status_code || StatusCodes.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }
)

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}