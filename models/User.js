const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [3, 'Username is shorter than 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email is shorter than 10 characters']
        // unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password is shorter than 4 characters']
    },
    createdElectronics: [{
        type: mongoose.Types.ObjectId,
        ref: 'Electronic',
    }],
    boughtElectronics: [{
        type: mongoose.Types.ObjectId,
        ref: 'Electronic',
    }],
}, 
{ timestamps: true}
);

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
