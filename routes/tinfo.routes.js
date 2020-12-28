const {Router} = require('express')
const Discipline = require('../models/Discipline')
const Test = require('../models/Test')
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/disciplines/:id', auth, async (req, res) => {
  try {  
    const teacher = await Teacher.findById(req.params.id)
    // console.log(teacher.disciplines)
    const disc = await Discipline.find({name:teacher.disciplines})
    
    res.json(disc)


  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    res.json(await Discipline.findById(req.params.id))
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})
 
router.get('/:id/testlist', auth, async (req, res) => {
  try {
    // const discipline = await Discipline.findById(req.params.id)

    const test = await Test.find({owner: req.params.id})
    
    res.json({test})
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})


router.get('/:id/testresult', auth, async (req, res) => {
  try {
   
    const discipline = await Discipline.findById(req.params.id)
    
    const student = await Student.find({disciplines: discipline.name})

    // const test = await Test.findById(req.params.id)
    // console.log(test)
    // console.log(student)
    
    res.json(student)
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})
router.get('/:id/:id', auth, async (req, res) => {
  try {
    
    const test = await Test.findById(req.params.id)
    
    res.json(test)
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

router.post('/:id/create-test', auth, async (req, res) => {
  try {
    const {name, correctAnswer, questions, answers_0, answers_1, answers_2} = req.body
    const answers = [answers_0, answers_1, answers_2]
    const body = [{correctAnswer, questions, answers}] 
    console.log(req.params.id)
    const candidate = await Test.findOne({ name })
    if(candidate){
      
      candidate.body.push({correctAnswer, questions, answers})
      await candidate.save()
      return res.status(201).json({ candidate })
    }
    const test = new Test({
      name, body, owner: req.params.id
    }) 
    await test.save()
    return res.status(201).json({ test })
    
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

module.exports = router