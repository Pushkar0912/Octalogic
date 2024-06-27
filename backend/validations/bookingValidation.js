const sequelize= require('../config/database')

module.exports={
    checkVehicleExistOrNot:async (wheels,vehicleType,vehicleModel)=>{
        let vehicle_uuid = await sequelize.models.Vehicle.findOne({
            where:{
                wheels:wheels,
                vehicleType:vehicleType
            },
            attributes:["uuid"]
        })
        if(vehicle_uuid.length){
            let vehicles = await sequelize.models.VehicleType.findOne({
                where:{
                    vehicleModel:vehicleModel,
                    vehicle_uuid:vehicle_uuid
                }
            })
            if(vehicles.length){
                return {error:"This vehicle already exist",status:true}
            }else{
                return {error:"",status:false} 
            }
        }else{
            return {error:"",status:false}
        }
        
        
    },

    checkValidation:async(vehicleModelUuid,startDate,endDate,firstName,lastName)=>{
        var error="";
        if(!vehicleModelUuid){
            error="Vehicle Model Uuid is required"
        }else if(!startDate){
            error="start Date is required"
        }else if(!endDate){
            error="End Date is required"
        }else if(!firstName){
            error="First Name is required"
        }else if(!lastName){
            error="Last Name is required"
        }else{
            return {error:"",status:false}
        }
    }
}