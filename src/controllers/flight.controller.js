const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { asyncHandler, ApiResponse, ApiError, compareTime } = require("../utils");

/*
    POST Method
    req_body : { flightNumber, airplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats }

*/

/*
    flightNumber: 'UK 808' ,
    airplaneId : 'a380',
    departureAirportId : 12,
    arrivalAirportId : 3,
    arrivalTime : '11:10:00',
    departureTime : '9:20:00',
    price : 3450,
    boardingGate : '3A',
    totalSeats : 120,
*/

const createFlight = asyncHandler (
    async (req, res) => {
        try {
            const { flightNumber, airplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats } = req.body;
            
            if(compareTime(arrivalTime, departureTime) == false){
                throw new ApiError(
                    StatusCodes.BAD_REQUEST,
                    "Departure Time cannot be before Arrival Time"
                );
            }

            const Flight = await FlightService.createFlight(
                {
                    flightNumber, 
                    airplaneId, 
                    departureAirportId, 
                    arrivalAirportId, 
                    arrivalTime, 
                    departureTime, 
                    price, 
                    boardingGate, 
                    totalSeats
                }
            )

            return res.
                    status(StatusCodes.CREATED).
                    json(
                        new ApiResponse(
                            StatusCodes.CREATED,
                            Flight,
                        "Flight Added Successfully"
                    )
            );
        } catch (error) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                error.message,
            );
        }
    }
);

const getAllFlights = asyncHandler(
    async (req, res) => {
        try{
            const flights = await FlightService.getFilterFlights(req.query);
            return res
                    .status(StatusCodes.OK)
                    .json(
                        new ApiResponse(
                            StatusCodes.OK,
                            flights,
                            "Flights Fetched"
                        )
                    )
        }catch(error){
            throw new ApiError(
                error.status_codes || StatusCodes.INTERNAL_SERVER_ERROR,
                error.message
            )
        }
    }
)

module.exports = {
    createFlight,
    getAllFlights
}