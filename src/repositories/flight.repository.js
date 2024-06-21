const CrudRepository = require("./crud.repository");
const { Flight } = require("../models");
const { Logger } = require("../config");

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter){
        try{
            const response = await Flight.findAll(
                {
                    where: filter
                }
            );
            return response;
        }catch(error){
            Logger.error("Something Went Wrong in Fetching Flights", {});
            throw error;
        }
    }
}

module.exports = FlightRepository;