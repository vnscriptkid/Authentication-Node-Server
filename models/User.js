const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: 'You must provide email!',
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: 'You must provide password'
    }
})

const saltRounds = 10;

userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
})

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
