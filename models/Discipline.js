const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  teachers: {type: Array, required: true},
  studentGroups: {type: Array, required: true},
  test: [{type: Types.ObjectId, ref: 'Test'}],
  owner: {type: Types.ObjectId, ref: 'User'}
})
 
module.exports = model('Discipline', schema)
