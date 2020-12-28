const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  disciplines: [{type: Types.ObjectId, ref: 'Discipline'}],
  teachers: [{type: Types.ObjectId, ref: 'Teacher'}],
  students: [{type: Types.ObjectId, ref: 'Student'}]
})

module.exports = model('User', schema)
