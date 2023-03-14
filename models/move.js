const Sequelize = require('sequelize');
const mysql2 = require('mysql2')

const sequelize = require('../util/database');

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully in move.js file');
  })
  .catch((error) => {
    console.error('Unable to connect to the database in move.js file:', error);
  });
  console.log("Pored seuqelize checkera u move.js");


const Move = sequelize.define('move',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
        
    },

    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    company: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    passcode: Sequelize.STRING,

    rate: Sequelize.INTEGER,
    crew_size: Sequelize.INTEGER,
    truck_number: Sequelize.INTEGER,
    travel_time: Sequelize.INTEGER,
    deposit: Sequelize.INTEGER,

    origin_address: Sequelize.STRING,
    origin_address2: Sequelize.STRING,
    origin_city: Sequelize.STRING,
    origin_state: Sequelize.STRING,
    origin_zipcode: Sequelize.STRING,
    origin_type: Sequelize.STRING,
    origin_building_type: Sequelize.STRING,
    origin_floor: Sequelize.STRING,
    origin_stairs_elevator: Sequelize.STRING,
    origin_elevator_type: Sequelize.STRING,
    origin_elevator_reservation_start: Sequelize.DATE,
    origin_elevator_reservation_end: Sequelize.DATE,
    
    destination_address: Sequelize.STRING,
    destination_address2: Sequelize.STRING,
    destination_city: Sequelize.STRING,
    destination_state: Sequelize.STRING,
    destination_zipcode: Sequelize.STRING,
    destination_type: Sequelize.STRING,
    destination_building_type: Sequelize.STRING,
    destination_floor: Sequelize.STRING,
    destination_stairs_elevator: Sequelize.STRING,
    destination_elevator_type: Sequelize.STRING,
    destination_elevator_reservation_start: Sequelize.DATE,
    destination_elevator_reservation_end: Sequelize.DATE,
    
    service_type: Sequelize.STRING,
    
    requested_origin_date_from: Sequelize.DATE,
    requested_origin_date_to: Sequelize.DATE,
    requested_origin_time_from: Sequelize.STRING,
    requested_origin_time_to: Sequelize.STRING,

    requested_destination_date_from: Sequelize.DATE,
    requested_destination_date_to: Sequelize.DATE,
    requested_destination_time_from: Sequelize.STRING,
    requested_destination_time_to: Sequelize.STRING,

    signature1_url: Sequelize.STRING,
    signature1_hash: Sequelize.STRING,
    signature1_datetime: Sequelize.DATE,

    start_date: Sequelize.DATEONLY ,
    start_time: Sequelize.TIME,

    notes: Sequelize.TEXT,
    
    cpb15: Sequelize.INTEGER,
    cpb30: Sequelize.INTEGER,
    cpb45: Sequelize.INTEGER,
    cpb60: Sequelize.INTEGER,
    cpmirror: Sequelize.INTEGER,
    cpdishpack: Sequelize.INTEGER,
    cpmattress: Sequelize.INTEGER,

    opb15: Sequelize.INTEGER,
    opb30: Sequelize.INTEGER,
    opb45: Sequelize.INTEGER,
    opb60: Sequelize.INTEGER,
    opmirror: Sequelize.INTEGER,
    opdishpack: Sequelize.INTEGER,
    opmattress: Sequelize.INTEGER,
    optape: Sequelize.INTEGER,
    opbubble: Sequelize.INTEGER,
    
    end_date: Sequelize.DATEONLY ,
    end_time: Sequelize.TIME,
    
    add_service_1: Sequelize.STRING,
    add_service_11: Sequelize.INTEGER,
    add_service_111: Sequelize.INTEGER,

    add_service_2: Sequelize.STRING,
    add_service_22: Sequelize.INTEGER,
    add_service_222: Sequelize.INTEGER,

    add_service_3: Sequelize.STRING,
    add_service_33: Sequelize.INTEGER,
    add_service_333: Sequelize.INTEGER,

    
    signature2_url: Sequelize.STRING,
    signature2_hash: Sequelize.STRING,
    signature2_datetime: Sequelize.DATE,

    packingmaterials: Sequelize.INTEGER,
    labor_time: Sequelize.INTEGER,
    subtotal: Sequelize.INTEGER,
    subtotalcc: Sequelize.INTEGER,
    merchantfee: Sequelize.INTEGER

});

module.exports = Move;
