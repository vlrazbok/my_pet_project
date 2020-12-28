const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')
const router = Router()
 

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некоректна пошта').isEmail(),
    check('password', 'Мінімальна довжина символів повинна бути більше 6')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некоректні данні при реєстрації'
      })
    }

    const {email, password, role} = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'Такий користувач вже існує' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword, role })

    await user.save()

    res.status(201).json({ message: 'Користувача створено' })

  } catch (e) {
    res.status(500).json({ message: 'Щось пішло не так, спробуйте заново' })
  }
})

// /api/auth/login 
router.post(
  '/login',
  [
    check('email', 'Введіть коретну пошту').normalizeEmail().isEmail(),
    check('password', 'Введіть пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некоретні дані при вході в систему'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({ email })
    const teacher = await Teacher.findOne({ email })
    const student = await Student.findOne({ email })

    if (!user && !teacher && !student) {
      return res.status(400).json({ message: 'Користувача не знайдено' })
    }

    if(user){
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Некоретний пароль, спробуйте заново' })
      }

      const token = jwt.sign(
        { 
          userId: user.id,
          userRole: user.role
        },
        config.get('jwtSecret'),
        { expiresIn: '8h' }
      )

      res.json({ token, userId: user.id, userRole: user.role })
    }

    if(teacher){
      const isMatch = await bcrypt.compare(password, teacher.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Некоретний пароль, спробуйте заново' })
      }

      const token = jwt.sign(
        { 
          userId: teacher.id,
          userRole: teacher.role,
          teacherName: teacher.name
        },
        config.get('jwtSecret'),
        { expiresIn: '8h' }
      )
      res.json({ 
        token, 
        userId: teacher.id, 
        userRole: teacher.role,  
        teacherName: teacher.name })
    }

    if(student){
      const isMatch = await bcrypt.compare(password, student.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Некоретний пароль, спробуйте заново' })
      }
    
      const token = jwt.sign(
        { 
          userId: student.id,
          userRole: student.role,
         
        },
        config.get('jwtSecret'),
        { expiresIn: '8h' }
      )

      res.json({ token, 
        userId: student.id, 
        userRole: student.role, 
         })
    }

  } catch (e) {
    res.status(500).json({ message: 'Виникла помилка з сервером' })
  }
})

module.exports = router
