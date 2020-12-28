const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  body: {type: Array, required: true},
  owner: {type: Types.ObjectId, ref: 'Discipline'}
})
 
module.exports = model('Test', schema)