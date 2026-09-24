const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true,"This field cannot be empty"],
        minlength : [3,"Minimum 3 character needed "],
        maxlength: [20, "Maximum 20 character only"],
        trim : true
    },
    email : {
        type : String,
        unique: true,
        required : [true,"This field is mandatory"]
    },
    password : {
        type : String,
        required : [true,"Password is mandatory"],
        minlength : [6,"Minimum 6 char needed for password"]
    },
    profilePhoto : {
        type : String,
    },
    role : {
        type : String ,
        enum :["user","admin"],
        default : "user"
    }

},{
    timestamps : true
})

userSchema.pre('save',async function(){
    try {
        if(!this.isModified('password')) return next()
            this.password = await bcrypt.hash(this.password,9)
                
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User ;