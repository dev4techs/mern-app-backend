const mongoose = require("mongoose");
const  Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name:
        {
            type: String,
            trim: true,
            required: true
        },
        email:
        {
            type: String,
            trim: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address'],
            required: true
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        updated: Date,
        hashed_password: {
            type: String,
            required: true
        }
    }
)

var Users= mongoose.model('Users', UserSchema);

 module.exports=Users;