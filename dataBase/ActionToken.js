const {Schema, model, Types} = require('mongoose');

const actionTokenSchema = new Schema({
    _user_id: {type: Types.ObjectId, ref: 'User'},
    tokenType: {type: String},
    actionToken: {type: String},
}, {
    timestamps: true,
});

module.exports = model('ActionToken', actionTokenSchema);
