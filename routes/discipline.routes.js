const {Router} = require('express')
const Discipline = require('../models/Discipline')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/discipline-create', auth, async(req, res) =>{
  try {
    const {name} = req.body

    const existing = await Discipline.findOne({ name })

    if(existing){
      return res.json({ discipline: existing})
    }
    
    const discipline = new Discipline({
      name, owner: req.user.userId 
    }) 
    
    await discipline.save()

    res.status(201).json({ discipline })
    
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

router.post('/update-teacher', auth, async (req, res) => {
  try {
    const {name, discipline} = req.body
    const disc = await Discipline.findOne(discipline)
    disc.teachers.push(name)
    await disc.save()
    res.json(disc)
     
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, як треба, спробуйте знову' })
  }
})
router.post('/update-group', auth, async (req, res) => {
  try {
    const {group, discipline} = req.body
    const disc = await Discipline.findOne(discipline)
    disc.studentGroups.push(group)
    await disc.save()
    res.json(disc)
     
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, як треба в дисц-груп, спробуйте знову' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const disciplines = await Discipline.find({ owner: req.user.userId })
    res.json(disciplines)
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const discipline = await Discipline.findById(req.params.id)
    
    res.json(discipline)
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

module.exports = router