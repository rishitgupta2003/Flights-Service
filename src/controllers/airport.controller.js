const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { asyncHandler, ApiResponse, ApiError } = require("../utils");

/*
    POST Method
    req_body : { name, code, address, cityID },
    /airport/
*/

const createAiport = asyncHandler (
    async (req, res) => {
        try {
            const { name, code, address, cityID } = req.body;
            const airport = await AirportService.createAirport(
                {
                    name: name,
                    code: code,
                    address: address,
                    cityID: cityID
                }
            )

            return res.
                    status(StatusCodes.OK).
                    json(
                        new ApiResponse(
                            StatusCodes.OK,
                            airport,
                        "Airport Added Successfully"
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
    /airport/
    req.body : {}
*/

const getAirports = asyncHandler (
    async (req, res) => {
        try {
            const airport = await AirportService.getAirports();
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            airport,
                            "Fetched Airport Successfully"
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
    /airport/:id
    req.body : {}
*/

const getAirport = asyncHandler (
    async (req, res) => {
        try{
            const id = req.params.id;
            const airport = await AirportService.getAirport(id);
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            airport,
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
    /airport/:id
    req.body: {}
*/

const deleteAirport = asyncHandler (
    async (req, res) => {
        try{
            const id = req.params.id;
            const response = await AirportService.deleteAirport(id);
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
    /airport/:id
    req.body: {
        'fieldToChange': __,
        'newValue':__
    }
*/

const updateAirport = asyncHandler (
    async (req, res) => {
        try {
            const id = req.params.id;
            const data = {
                id,
                data: req.body
            }
            const response = await AirportService.updateAirport(data);
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            response,
                            "Airport Updated Successfully"
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
    createAiport,
    getAirport,
    getAirports,
    deleteAirport,
    updateAirport
}