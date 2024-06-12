const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const { ApiError } = require("../utils")
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane
    } catch (error) {
        console.log(error);
        if(error.name == "SequelizeValidationError"){
            console.log(error);
        
            throw new ApiError(StatusCodes.BAD_REQUEST, error.toString());
        }
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }    
}

module.exports = {
    createAirplane
}