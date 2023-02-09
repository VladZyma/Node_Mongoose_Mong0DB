const {Schema, model, Types} = require('mongoose');

const carSchema = new Schema({
    producer: {type: String, trim: true, required: true},
    model: {type: String, trim: true, required: true},
    year: {type: Number, required: true},
    _user_id: {type: Types.ObjectId, ref: 'User', require: true},
},{
    timestamps: true,
});

module.exports = model('Car', carSchema);
