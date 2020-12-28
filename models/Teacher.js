const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  disciplines: {type: Array, required: true},
  role: {type: String, required: true},
  owner: {type: Types.ObjectId, ref: 'User'}
})
 
module.exports = model('Teacher', schema)