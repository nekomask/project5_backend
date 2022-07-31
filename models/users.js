const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true, required: true, minlength: 3},
    password: {type: String, unique: false, required: true},
    bikes: [{type: Schema.Types.ObjectId, ref: 'Item'}]
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;