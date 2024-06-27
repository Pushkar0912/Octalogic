const {Sequelize} = require('sequelize')
const dotenv = require('dotenv')
const process = dotenv.config()

const vehicleModel = require('../models/vehicle');
const vehicleTypeModel = require('../models/vehicletype');
const bookingModel = require('../models/booking');
console.log( process.parsed.DATABASE_NAME,
    process.parsed.DATABASE_USER,
    process.parsed.DATABASE_PASSWORD)
const sequelize = new Sequelize(
    process.parsed.DATABASE_NAME,
    process.parsed.DATABASE_USER,
    process.parsed.DATABASE_PASSWORD,{
        host:process.parsed.DATABASE_HOST,
        dialect:'mysql',
        logging:true,
        define:{
            freezeTableName:true,
            underscored:true,
        }
    }
);

sequelize.sync({ force: false }).then(() => {
    console.log("yes re-sync done");
});

const models = {
    Vehicle: vehicleModel(sequelize,Sequelize.DataTypes),
    VehicleType: vehicleTypeModel(sequelize,Sequelize.DataTypes),
    Booking:bookingModel(sequelize,Sequelize.DataTypes)
}

models.Vehicle.hasOne(models.VehicleType,{foreignKey: 'vehicle_uuid'});
models.VehicleType.belongsTo(models.Vehicle,{foreignKey: 'vehicle_uuid' });

models.VehicleType.hasMany(models.Booking,{foreignKey: 'vehicle_uuid'});
models.Booking.belongsTo(models.VehicleType,{foreignKey: 'vehicle_uuid' });

module.exports = {sequelize,models}