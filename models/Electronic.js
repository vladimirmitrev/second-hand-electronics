const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [10, 'Name is shorter than 10 characters']
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
        minLength: [2, 'Type is shorter than 10 characters']
    },
    damages: {
        type: String,
        required: [true, 'Damages is required!'],
        minLength: [10, 'Damages is shorter than 10 characters']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Invalid image URL'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description is shorter than 10 characters'],
        maxLength: [200, 'Description is longer than 200 characters'],
    },
    production: {
        type: Number,
        required: [true, 'Production is required!'],
        min: [1900, 'Minimum production year is 1900'],
        max: [2023, 'Maximum production year is 2023'],
       
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation is required!'],
        min: [0, 'Exploitation must be positive number!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price must be positive number!'],
    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, 
{ timestamps: true}
);

const Electronic = mongoose.model('Electronic', courseSchema);

module.exports = Electronic;
