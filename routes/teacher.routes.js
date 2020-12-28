const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const Teacher = require('../models/Teacher')
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

    const {email, password, name, disciplines, role} = req.body

    const candidate = await Teacher.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'Такий користувач вже існує' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const teacher = new Teacher({
      email, password: hashedPassword, name, disciplines, role, owner: req.user.userId})

    await teacher.save()
 
    res.status(201).json({ teacher })

  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не такc, спробуйте заново' })
  }
})

router.post('/update-discipline', auth, async (req, res) => {
  try {
    const {name, discipline} = req.body
    
    const teach = await Teacher.findOne({name})
    teach.disciplines.push(discipline.name)
    await teach.save()
    
    res.json(teach)
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, як треба, спробуйте знову' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const teachers = await Teacher.find({ owner: req.user.userId })
    res.json(teachers)
    
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
    
    res.json(teacher)
  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
  }
})

module.exports = router