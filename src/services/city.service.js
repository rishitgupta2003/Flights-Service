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
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    createCity
}