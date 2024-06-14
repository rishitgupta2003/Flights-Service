const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const { ApiError } = require("../utils")
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let errExp = [];
            error.errors.forEach((err) => {
                errExp.push(err.message);
            });
            throw new ApiError(StatusCodes.BAD_REQUEST, errExp.toString(), errExp);
        }
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }    
}

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id);
        if(!airplane){
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "NOT FOUND / DOESN'T EXIST"
            );
        }
        return airplane;
    } catch (error) {
        throw new ApiError(error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function deleteAirplane(id){
    try {
        const response = await airplaneRepository.destroy(id);
        if(!response){
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Unable to DELETE Given Airplane"
            );
        }
        return response;
    } catch (error) {
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane
}