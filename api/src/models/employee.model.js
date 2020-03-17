const Mongoose = require('mongoose');

const EmployeeSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    position: {type: String, required: true},
    salary: {type: Number, required: true}
});

module.exports = Mongoose.model('Employee', EmployeeSchema);