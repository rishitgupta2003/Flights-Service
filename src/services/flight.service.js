const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { ApiError } = require("../utils")
const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        const Flight = await flightRepository.create(data);
        return Flight
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

async function getFlights(){
    try {
        const Flights = await flightRepository.getAll();
        return Flights;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function getFlight(id){
    try {
        const Flight = await flightRepository.get(id);
        if(!Flight){
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "NOT FOUND / DOESN'T EXIST"
            );
        }
        return Flight;
    } catch (error) {
        throw new ApiError(error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function deleteFlight(id){
    try {
        const response = await flightRepository.destroy(id);
        if(!response){
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Unable to DELETE Given Flight"
            );
        }
        return response;
    } catch (error) {
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function updateFlight(data){
    try {
        const response = await flightRepository.update(data);
        if(!response){
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Flight Not Found"
            )
        }
        return response;
    } catch (error) {
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    createFlight,
    getFlights,
    getFlight,
    deleteFlight,
    updateFlight
}