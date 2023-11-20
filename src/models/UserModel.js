const mongoose = require('mongoose');


const DataSchema = mongoose.Schema(
    {
        Date:{type:Date, default: Date.now},
        email: {type: String, require: true, unique: true},
        firstName: {type: String, require: true},
        listName: {type: String, require: true},
        mobile: {type: String, require: true},
        password: {type: String, require: true}
    },
    {
        versionKey: false,
        timeStamp: true
    }
)

const UserModel = mongoose.model('userdetails',DataSchema);

module.exports = UserModel;