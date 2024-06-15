const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ApiResponse, ApiError, asyncHandler } = require("../utils");

/*
    POST Method
    req.body: { cityName }
    /city/
*/

const createCity = asyncHandler (
    async (req, res) => {
        try {
            const { cityName } = req.body;
            const city = await CityService.createCity(
                {
                    name: cityName
                }
            );
            
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            city,
                            "City Created Successfully"
                        )
                    );
        } catch (error) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                error.message
            );
        }
    }
)

/*
    GET Method
    req.body: {}
    /city/    
*/

const getCities = asyncHandler (
    async (req, res) => {
        try {
            const cities = await CityService.getCities();
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            cities,
                            "Fetched Cities Successfully"
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
    /city/:id
    req.body: {}
*/

const getCity = asyncHandler (
    async (req, res) => {
        try {
            const id = req.params.id;
            const city = await CityService.getCity(id);
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            city,
                            "Fetched Details Successfully"
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

/*
    DELETE Method
    /city/:id
    req.body: {}
*/

const deleteCity = asyncHandler (
    async (req, res) => {
        try{
            const id = req.params.id;
            console.log(id);
            const response = await CityService.deleteCity(id);
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            response,
                            "Deleted Successfully"
                        )
                    )
        }catch(error){
            throw new ApiError(
                error.status_code || StatusCodes.INTERNAL_SERVER_ERROR,
                error.message
            )
        }
    }
)

/*
    PATCH Method
    /city/:id
    req.body: {
        'fieldToChange' : ___,
        'newValue' : ___
    }
*/

const updateCity = asyncHandler (
    async (req, res) => {
        try{
            const id = req.params.id;
            const data = {
                id: id,
                data: {
                    name: req.body.cityName
                }
            };
            const response = await CityService.updateCity(data);
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            response,
                            "City Updated Successfully"
                        )
                    );
        }catch(error){
            throw new ApiError(
                error.status_code || StatusCodes.INTERNAL_SERVER_ERROR,
                error.message
            )
        }
    }
)


module.exports = {
    createCity,
    getCities,
    getCity,
    deleteCity,
    updateCity
}