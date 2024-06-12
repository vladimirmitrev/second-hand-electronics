const router = require('express').Router();
const electronicService = require('../services/electronicService');
const { getErrorMessage } = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {

  res.render('home');
});

router.get('/search', isAuth, async (req, res) => {
  const { name, type } = req.query; 
  
  try {
    const electronics = await electronicService.search(name, type).lean();

    res.render('search', { electronics, name, type });

  } catch (err) {
    res.render('search', { error: getErrorMessage(err), name, type })
  }

});

module.exports = router;
