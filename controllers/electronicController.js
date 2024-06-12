const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { isElectronicOwner } = require('../middlewares/electronicsMiddlewares');
const Electronic = require('../models/Electronic');
const electronicService = require('../services/electronicService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/catalog', async (req, res) => {
    const electronics = await electronicService.getAll().lean();

    res.render('electronics/catalog', { electronics });
});

router.get('/create', isAuth, (req, res) => {
    res.render('electronics/create');
  });
  
router.post('/create', isAuth, async (req, res) => {
    const electronicsData = req.body;
    const userId = req.user._id;
  
    try {
      await electronicService.create(userId, electronicsData);
      
      res.redirect('/electronics/catalog');
  
    } catch (err){
       console.log(err);
       res.render('electronics/create', {...electronicsData, error: getErrorMessage(err)})
    }
  });

  router.get('/:electronicId/details', async (req, res) => {
    const electronicId = req.params.electronicId;
    const userId = req.user?._id;
    try {
      const electronic = await electronicService.getOneDetailed(electronicId).lean();
      const buyingList = electronic.buyingList.map(user => user.username).join(', ');
      const isOwner = electronic.owner && electronic.owner._id == userId;
      const isBuying = electronic.buyingList.some(user => user._id == userId);

      res.render('electronics/details', { ...electronic, buyingList, isOwner, isBuying });
    } catch (err) {
      // console.log(err);
      res.redirect('/');
    }
});

router.get('/:electronicId/buy', isAuth, async (req, res) => {
  try {
    await electronicService.buy(req.params.electronicId, req.user._id);

    res.redirect(`/electronics/${req.params.electronicId}/details`);

  } catch (err) {
    // console.log(err);
    res.redirect('/');
  }
});

router.get('/:electronicId/delete', isElectronicOwner, async (req, res) => {
  await electronicService.delete(req.params.electronicId);

  res.redirect('/electronics/catalog');
});

router.get('/:electronicId/edit', isElectronicOwner, async (req, res) => {

  res.render(`electronics/edit`, { ...req.electronic });
});

router.post('/:electronicId/edit', isElectronicOwner, async (req, res) => {
  const electronicData = req.body;
  const electronicId = req.params.electronicId;

  try {
    await electronicService.edit(electronicId, electronicData);

    res.redirect(`/electronics/${electronicId}/details`);
  } catch (err) {
    
    res.render(`electronics/edit`, {...electronicData, error: getErrorMessage(err)});
  }
});


module.exports = router;