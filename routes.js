const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const electronicController = require('./controllers/electronicController');

router.use(homeController);
router.use('/auth', authController);
router.use('/electronics', electronicController);

router.all('*', (req, res) => {
   res.render('404'); 
});

module.exports = router;
