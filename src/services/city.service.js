const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const { ApiError } = require("../utils");

const cityRepository = new CityRepository();

async function createCity(data){
    try{
        const city = await cityRepository.create(data);
        return city;
    }catch(error){
        if(error.name == 'SequelizeValidationError'){
            let errExp = [];
            error.errors.forEach( (err) => {
                errExp.push(err.message);
            });
            throw new ApiError(StatusCodes.BAD_REQUEST, errExp.toString());
        }
        throw new ApiError(error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function getCities(){
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR, error.message
        );
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        if(!city){
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "NOT FOUND / DOESN'T EXIST"
            )
        }
        return city;
    } catch (error) {
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message
        );
    }
}

async function deleteCity(id){
    try{
        const response = await cityRepository.destroy(id);
        if(!response){
            throw new ApiError(
                StatusCodes.NOT_FOUND, "Unable to Delete Given City"
            );
        }
        return response;
    }catch(error){
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message
        );
    }
}

async function updateCity(data){
    try {
        const response = await cityRepository.update(data);
        if(!response){
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "City Not Found"
            );
        }
    } catch (error) {
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message
        )
    }
}

module.exports = {
    createCity,
    getCities,
    getCity,
    deleteCity,
    updateCity
}