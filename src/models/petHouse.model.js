const { Schema, model} = require('mongoose')
const petHouseSchema = new Schema(
    {
        overview: {
            name : { type : String, required : true},
            city : { type : String, required : true},
            address : { type : String, required : true},
            capacity : { type : Number, required : true},
            costPerDay : { type : Number, required : true},
            verified : { type : Boolean, required : true},
            rating : { type : Number, required : true},
          },
          more: {
            noOfCaredPets : { type : Number, required : true},
            acceptedPets : [{ type : String}],
            petSize : { type : String, required : true},
            noOfWalksPerDay : { type : Number, required : true},
            outerAreaSize : { type : String, required : true},
            emergencyTransportFacility : { type : String, required : true} 
          }
    },
    {
        versionKey : false
    }
)
module.exports = model('petHouse', petHouseSchema)