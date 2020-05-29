const { body } = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
  body('email').isEmail().withMessage('Некорректный email').custom(async (value, { req }) => {
    try {
      const user = await User.findOne({ email: value })
      if (user) {
        return Promise.reject('Пользователь с таким email уже зарегистрирован')
      }
    } catch (e) {
      console.log(e)
    }
  }).normalizeEmail(),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6, max: 10 }).isAlphanumeric().trim(),
  body('confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Пароли должны совпадать')
    }
    return true
  }).trim(),
  body('name').isLength({ min: 3 }).withMessage('Имя должно быть не меньше трёх символов').trim(),

]

exports.courseValidators = [
  body('title').isLength({min: 3}).withMessage('Минимальная длина названия 3 символа').trim(),
  body('price').isNumeric().withMessage('Введите корректную цену'),
  body('img', 'Введите корректный URL картинки').isURL()
]