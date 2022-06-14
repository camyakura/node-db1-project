const router = require('express').Router()
const Account = require('./accounts-model')
const { 
  checkAccountId, 
  checkAccountNameUnique, 
  checkAccountPayload, 
} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const result = await Account.getAll()
    res.json(result)
  } catch(err) {
      next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const result = await Account.getById(req.params.id)
    res.json(result)
  } catch(err) {
      next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const result = await Account.create({
      name: req.body.name.trim(), 
      budget: req.body.budget
    })
    res.status(201).json(result)
  } catch(err) {
      next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const result = await Account.updateById(req.params.id, req.body)
    res.json(result)
  } catch(err) {
      next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const result = await Account.deleteById(req.params.id)
    res.json(result)
  } catch(err) {
      next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
