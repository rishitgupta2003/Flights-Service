const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const { ApiError } = require('../utils');

const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
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

async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new ApiError(
           StatusCodes.INTERNAL_SERVER_ERROR, error.message
        );
    }
}

async function getAirport(id){
    try{
        const airport = await airportRepository.get(id);
        if(!airport){
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "NOT FOUND / DOESN'T EXIST"
            );
        }
        return airport;
    }catch(error){
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message
        );
    }
}

async function deleteAirport(id){
    try {
        const response = await airportRepository.destroy(id);
        if(!response){
            throw new ApiError(
                StatusCodes.NOT_FOUND, "Unable to Delete Given Airport"
            );
        }
        return response;
    } catch (error) {
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message
        );
    }
}

async function updateAirport(data){
    try {
        const response = await airportRepository.update(data);
        if(!response){
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Airport Not Found"
            );
        }
        return response;
    } catch (error) {
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message
        );
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport
}