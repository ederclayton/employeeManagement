const Mongoose = require('mongoose');
const Bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const UserSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

UserSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, SALT_ROUNDS);
    next();
});

module.exports = Mongoose.model('User', UserSchema);