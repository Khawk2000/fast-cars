const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const carSchema = new mongoose.Schema(
    {
    make:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    fueltype:{
        type: String,
        required: true
    },
    doors:{
        type: Number,
        required: true
    },
    seats:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    firstDate:{
        type: Date,
        required: true
    },
    lastDate:{
        type: Date,
        required: true
    },
    booked: {
        type: Boolean,
        required: true,
        default: false
    }
}
)


module.exports = mongoose.model('Car', carSchema)