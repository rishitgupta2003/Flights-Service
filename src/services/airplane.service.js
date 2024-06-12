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

module.exports = {
    createAirplane
}