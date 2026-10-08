const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
    reporter :{
        type :mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Review',
        required:true
    },
    reportedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    reason:{
        type:String,
        enum:['abuse','spoiler','offensive','other'],
        required:true
    },
    note:{
        type:String,
        maxlength:300
    },
    status:{
        type : String,
        enum: ['pending', 'dismissed', 'actioned'],
        default: 'pending'
    }
},
    {
        timesatmps:true
    }
)

reportSchema.index({reporter:1 , review : 1},{unique:true})

const Report = mongoose.model('Report',reportSchema)
module.exports = Report;