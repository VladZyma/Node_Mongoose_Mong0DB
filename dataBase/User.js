const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, trim: true, required: true},
    age: {type: Number, required: true},
    email: {type: String, trim: true, lowercase: true, unique: true, required: true},
    password: {type: String, trim: true, required: true},
}, {
    timestamps: true,
});

module.exports = model('User', userSchema);
