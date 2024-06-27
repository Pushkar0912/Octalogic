const sequelize= require('../config/database');
const Op = require('sequelize').Op;
const validation=require("../validations/bookingValidation")
module.exports={
    insertData:async (req,res)=>{
        const {wheels,vehicleType,vehicleModel} = req.body
        let vehicle_uuid = await sequelize.models.Vehicle.findOne({
            where:{
                wheels:wheels,
                vehicleType:vehicleType
            },
            attributes:["uuid"]
        })
        vehicle_uuid= JSON.parse(JSON.stringify(vehicle_uuid));
        if(vehicle_uuid){
            let vehicles = await sequelize.models.VehicleType.findOne({
                where:{
                    vehicleModel:vehicleModel,
                    vehicle_uuid:vehicle_uuid
                }
            })
            vehicles = JSON.parse(JSON.stringify(vehicles))
            if(vehicles){
                return res.status(400).send({status:400,message:"This Vehicle already existed"})
            }else{
                await sequelize.models.VehicleType.create({vehicleModel:vehicleModel,vehicle_uuid:vehicles.uuid}).then((vehicle)=>{
                    return res.status(200).send({status:200,message:"Created Vehicle Successfully"})
                }).catch((err)=>{
                    return res.status(400).send({status:400,message:err})
                })
            }
        }else{
            await sequelize.models.Vehicle.create({wheels:wheels,vehicleType:vehicleType}).then(async (veh)=>{
                await sequelize.models.VehicleType.create({vehicleModel:vehicleModel,vehicle_uuid:veh.uuid}).then((vehicle)=>{
                    return res.status(200).send({status:200,message:"Created Vehicle Successfully"})

                })
            }).catch((err)=>{
                return res.status(400).send({status:400,message:err})
            })
        }
    },
    getVehicleType:async (req,res)=>{
      const wheel = req.params.wheel;
        if(wheel == "2" || wheel == "4"){
            try{
              let vehicleTypes = await  sequelize.models.Vehicle.findAll({
                  where:{wheels:wheel},
                  attributes:["uuid","vehicle_type"]
              })
              return res.status(200).send({status:200,data:vehicleTypes,message:"Success"})

            }catch(err){
                return res.status(400).send({status:400,message:err})
            }
        }else{
            return res.status(400).send({status:400,message:"Choosen wrong vehicle"})
        }
    },
    getVehicleModel:async (req,res)=>{
        const uuid = req.params.uuid;
        try{
            let vehicle_type_uuid= await sequelize.models.Vehicle.findOne({
                where:{
                    uuid:uuid
                }
            })
            vehicle_type_uuid =  JSON.parse(JSON.stringify(vehicle_type_uuid));
            if(vehicle_type_uuid){
                let vehicleModel = await  sequelize.models.VehicleType.findAll({
                    where:{vehicle_uuid:uuid},
                    attributes:["uuid","vehicle_model"]
                })
                return res.status(200).send({status:200,data:vehicleModel,message:"Success"})
            }else{
                return res.status(400).send({status:400,message:"Choosen wrong vehicle Type"})
            }
        }catch(err){
            return res.status(400).send({status:400,message:err})
        }
    },
    bookVehicle: async (req, res) => {
      const { vehicleModelUuid, startDate, endDate, firstName, lastName } = req.body;

      if (!vehicleModelUuid) {
        return res.status(400).send({ status: 400, message: 'Vehicle Model Uuid is required.' });
      }
      if (!startDate) {
        return res.status(400).send({ status: 400, message: 'Start Date is required.' });
      }
      if (!endDate) {
        return res.status(400).send({ status: 400, message: 'End Date is required.' });
      }
      if (!firstName) {
        return res.status(400).send({ status: 400, message: 'First Name is required.' });
      }
      if (!lastName) {
        return res.status(400).send({ status: 400, message: 'Last Name is required.' });
      }

      try {
        const startDateParsed = new Date(startDate).toISOString().split('T')[0];
        const endDateParsed = new Date(endDate).toISOString().split('T')[0];

        const parsedStartDate = new Date(startDateParsed); 
        const parsedEndDate = new Date(endDateParsed); 

        if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
          return res.status(400).send({ status: 400, message: 'Invalid date format.' });
        }

        const vehicleType = await sequelize.models.VehicleType.findOne({
          where: {
            uuid: vehicleModelUuid,
          },
        });

        if (!vehicleType) {
          return res.status(400).send({ status: 400, message: 'Chosen wrong vehicle model.' });
        }

        const existingBookings = await sequelize.models.Booking.findAll({
          where: {
            vehicle_uuid: vehicleModelUuid,
            [Op.or]: [
              {
                start_date: { [Op.between]: [parsedStartDate, parsedEndDate] },
              },
              {
                end_date: { [Op.between]: [parsedStartDate, parsedEndDate] },
              },
              {
                [Op.and]: [
                  { start_date: { [Op.lt]: parsedStartDate } },
                  { end_date: { [Op.gt]: parsedEndDate } },
                ],
              },
            ],
          },
        });

        if (existingBookings.length > 0) {
          return res.status(400).send({
            status: 400,
            message: 'Vehicle not available during the given timeframe.',
          });
        }

        const booked = await sequelize.models.Booking.create({
          first_name: firstName,
          last_name: lastName,
          startDate: parsedStartDate,
          endDate: parsedEndDate,
          vehicle_uuid: vehicleModelUuid,
        });

        return res.status(200).send({
          status: 200,
          data: booked,
          message: 'Vehicle booked successfully.',
        });

      } catch (error) {
        console.error('Error booking vehicle:', error);
        return res.status(500).send({
          status: 500,
          message: 'An error occurred while booking the vehicle.',
        });
      }
    }


}