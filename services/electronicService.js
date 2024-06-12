const Electronic = require('../models/Electronic');
const User = require('../models/User');

exports.create = async (userId, electronicData) => {
    const createdElectronic = await Electronic.create({
        owner: userId,
        ...electronicData,
    });

    await User.findByIdAndUpdate(userId, { $push: { createdElectronics: createdElectronic._id } });
    
    return createdElectronic;
}

exports.getAll = () => Electronic.find();

exports.getOne = (electronicId) => Electronic.findById(electronicId);

exports.getOneDetailed = (electronicId) => this.getOne(electronicId).populate('owner').populate('buyingList');

exports.buy = async (electronicId, userId) => {
    await Electronic.findByIdAndUpdate(electronicId, { $push: { buyingList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { boughtElectronics: electronicId } });
  
};

exports.delete = (electronicId) => Electronic.findByIdAndDelete(electronicId);

exports.edit = (electronicId, electronicData) => Electronic.findByIdAndUpdate(electronicId, electronicData,{ runValidators: true});