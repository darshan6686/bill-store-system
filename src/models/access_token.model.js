const { Schema, mongoose } = require("mongoose");

const userSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        token: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Access_token = mongoose.model('access_token', userSchema)
module.exports = Access_token;