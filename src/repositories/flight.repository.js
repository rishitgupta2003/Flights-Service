const CrudRepository = require("./crud.repository");
const { Sequelize } = require("sequelize");
const { Flight, Airplane, Airport, City } = require("../models");
const { Logger } = require("../config");
const db = require("../models");
const { addRowLocksOnFlights } = require("./query");

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter, sort){
        try{
            const response = await Flight.findAll(
                {
                    where: filter,
                    order: sort,
                    include: [
                        {
                            model: Airplane,
                            as: "airplaneDetail",
                            required: true
                        },
                        {
                            model: Airport,
                            as: "departureAirport",
                            required: true,
                            on: {
                                col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                            },
                            include: {
                                model: City,
                                required: true
                            }
                        },
                        {
                            model: Airport,
                            as: "arrivalAirport",
                            required: true,
                            on: {
                                col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                            },
                            include: {
                                model: City,
                                required: true
                            }
                        }
                    ]
                }
            );
            return response;
        }catch(error){
            Logger.error("Something Went Wrong in Fetching Flights", {});
            throw error;
        }
    }

    async updateRemainingSeats(flightId, seats, dec = true){
        try{
            await db.sequelize.query(addRowLocksOnFlights(flightId));  //pessimistic concurrency control
            const flight = await Flight.findByPk(flightId);
            console.log(seats);
            if(parseInt(dec)){
                const response = await flight.decrement('totalSeats', { by: seats });
                return response;
            }else{
                const response = await flight.increment('totalSeats', { by: seats });
                return response;
            }
        }catch(error){
            Logger.error("Something Went Wrong "+error.message, {});
            throw error;
        }
    }
}

module.exports = FlightRepository;