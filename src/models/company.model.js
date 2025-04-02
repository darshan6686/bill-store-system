const { Schema, default: mongoose } = require("mongoose");

const companySechema = new Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,
        },
        company_logo: {
            type: String
        },
        address: {
            type: String
        },
        
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Company = mongoose.model('company', companySechema)
module.exports = Company