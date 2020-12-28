const { v4 } = require('uuid')
const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Student = require('../models/Student')
const Discipline = require('../models/Discipline')
const fs = require('fs');


router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find({ owner: req.user.userId })
   
    res.json(students)
    
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})
router.get('/student/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
   
    res.json(student)
    
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    
    
    const student = await Student.findById(req.params.id)
    const disciplines = await Discipline.find({name: student.disciplines})
    res.json(disciplines)
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

router.get('/discipline/:id', auth, async (req, res) => {
  try {
    
    
    res.json(await Discipline.findById(req.params.id))
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})
router.get('/discipline/:id/test-list', auth, async (req, res) => {
  try {
    
    
    res.json(await Discipline.findById(req.params.id))
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

router.get('/:id/results', auth, async (req, res) => {
  try {
    res.json(await Student.findById(req.params.id))
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

router.post('/load-photo', auth, async (req, res) => {
  try {
    const data = req.body
    
    fs.writeFile(`photo/${v4()}.png`, data.data, {encoding: 'base64'}, function(err){
      //Finished
    });
        
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, як треба, спробуйте знову' })
  }
})
router.post('/save-result', auth, async (req, res) => {
  try {
    const {test, userId, allResults} = req.body

    const studentResult = [test.name, allResults]

    const student = await Student.findOne({_id: userId})
    student.testResult.push(studentResult)
    await student.save()

    res.json(student)
        
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, як треба, спробуйте знову' })
  }
})

module.exports = router
