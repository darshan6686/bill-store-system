const { Schema, mongoose } = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const userSchema = new Schema(
    {
        email: {
            type: String
        },
        password: {
            type: String
        },
        isBlock: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 8)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        config.config.TOKEN_SECRET,
        {
            expiresIn: config.config.TOKEN_EXPIRES
        }
    )
}

const User = mongoose.model('user', userSchema)
module.exports = User;