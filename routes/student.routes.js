const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const Student = require('../models/Student')
const auth = require('../middleware/auth.middleware')
const router = Router()

// /api/teacher
router.post(
  '/register',
  auth,
  [
    check('email', 'Некоректна пошта').isEmail(),
    check('password', 'Мінімальна довжина символів повинна бути більше 6')
      .isLength({ min: 6 }),
     
  ],
  
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некоретні данні при реєстрації'
      })
    }

    const {email, password, role, firstName, lastName, group, disciplines, testResult} = req.body

    const candidate = await Student.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'Такий користувач вже існує' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const student = new Student({
      email, password: hashedPassword, firstName, lastName, group, disciplines, testResult, role, owner: req.user.userId})

    await student.save()
 
    res.status(201).json({ student })

  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не такc, спробуйте заново' })
  }
})

router.post('/update-discipline', auth, async (req, res) => {
  try {
    const {group, discipline} = req.body
    const gr = await Student.find({group})
    gr.forEach(item => {
      item.disciplines.push(discipline.name)
      item.save()
    })
    res.json(gr)
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, як треба з студентами, спробуйте знову' })
  }
})
 
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find({ owner: req.user.userId })
   
    res.json(students)
    
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    
    res.json(student)
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

module.exports = router