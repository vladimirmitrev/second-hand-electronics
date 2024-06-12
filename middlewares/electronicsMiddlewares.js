const electronicService = require('../services/electronicService');

async function isElectronicOwner(req, res, next) {
    const electronic = await electronicService.getOne(req.params.electronicId).lean();
  
    if (electronic.owner != req.user?._id) {
      return res.redirect(`/electronics/${req.params.electronicId}/details`);
    }
  
    req.electronic = electronic;
  
    next();
  }
  
  exports.isElectronicOwner = isElectronicOwner;