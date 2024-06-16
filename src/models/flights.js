'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flights.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airplaneId: {
      types: DataTypes.INTEGER,
      allowNull: false
    },
    departureAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalAriportId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    prices: {
      types: DataTypes.INTEGER,
      allowNull: false
    },
    boardingGate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Flights',
  });
  return Flights;
};