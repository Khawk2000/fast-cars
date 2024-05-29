const mongoose = require('mongoose')


const carSchema = new mongoose.Schema(
    {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pic: {
        type: String,
        required: true
    },
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
        default: null
    },
    lastDate:{
        type: Date,
        default: null
    },
    booked: {
        type: Boolean,
        default: false
    }
}
)


module.exports = mongoose.model('Car', carSchema)