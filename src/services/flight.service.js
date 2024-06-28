const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { ApiError } = require("../utils");
const { Op } = require("sequelize");
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

async function getFilterFlights(query){
    try {
        const endTripTime = " 23:59:00"; 
        let customFilter = {};
        let sortFilter;
        if(query.trips){
            [departureAirportId, arrivalAirportId] = query.trips.split("-");
            
            if(departureAirportId === arrivalAirportId) throw new ApiError(StatusCodes.BAD_REQUEST, "Arrival & Departure Cannot be Same");

            customFilter.departureAirportId = departureAirportId;
            customFilter.arrivalAirportId = arrivalAirportId;
        }

        if(query.price){
            [minPrice, maxPrice] = query.price.split("-");
            customFilter.price = {
                [Op.between] : [minPrice, (maxPrice == undefined) ? 20000 : maxPrice]
            }
        }


        if(query.travellers){
            customFilter.totalSeats = {
                [Op.gte] : query.travellers
            }
        }

        if(query.tripDate){
            customFilter.departureTime = {
                [Op.between] : [query.tripDate, query.tripDate + endTripTime]
            }
        }

        if(query.sort){
           const params = query.sort.split(',');
           const sortFilters = params.map( (param) => param.split('_'));
           sortFilter = sortFilters; 
        }
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message || "Cannot fetch Data for Flights;"
        )
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

async function updateSeats(data){
    try{
        const response = await flightRepository.updateRemainingSeats(
            data.flightId,
            data.seats,
            data.dec
        );
        return response;
    }catch(error){
        throw new ApiError(
            error.status_code || StatusCodes.INTERNAL_SERVER_ERROR, error.message
        );
    }
}

module.exports = {
    createFlight,
    getFlight,
    deleteFlight,
    updateFlight,
    getFilterFlights,
    updateSeats
}