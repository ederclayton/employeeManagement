const Mongoose = require('mongoose');
const EmployeeModel = require('../models/employee.model');
const AppError = require('../utils/appError');

const validateEmployeeData = (name, position, salary) => {
    if (!name) {
        throw new AppError('No name was entered.');
    }

    if (!position) {
        throw new AppError('No position was entered.');
    }

    if (!salary) {
        throw new AppError('No salary was entered.');
    }

    if (salary <= 0) {
        throw new AppError('The salary must be positive.');
    }
};

const createEmployee = async (name, position, salary) => {
    validateEmployeeData(name, position, salary);

    const newEmployee = new EmployeeModel({name, position, salary});
    await newEmployee.save();

    return {
        _id: newEmployee._id,
        name,
        position,
        salary
    };
};

const getEmployees = async () => {
    const employees = await EmployeeModel.find({}, {'__v': 0});
    return employees;
};

const getEmployee = async (employeeId) => {

    if (!Mongoose.Types.ObjectId.isValid(employeeId)) {
        throw new AppError('Invalid Id.');
    }

    const employee = await EmployeeModel.findById(employeeId, {'__v': 0});
    if (employee === null) {
        throw new AppError('Employee not found.', 404);
    }
    return employee;
};

const updateEmployee = async (employeeId, name, position, salary) => {
    validateEmployeeData(name, position, salary);

    const updatedEmployee = {
        name, position, salary
    };

    if (!Mongoose.Types.ObjectId.isValid(employeeId)) {
        throw new AppError('Invalid Id.');
    }

    const employee = await EmployeeModel.findById(employeeId, {'__v': 0});
    if (employee === null) {
        throw new AppError('Employee not found.', 404);
    }

    await EmployeeModel.findByIdAndUpdate(employeeId, updatedEmployee);

    updatedEmployee._id = employeeId;

    return updatedEmployee;
};

const removeEmployee = async (employeeId) => {
    if (!Mongoose.Types.ObjectId.isValid(employeeId)) {
        throw new AppError('Invalid Id.');
    }
    const employee = await EmployeeModel.findById(employeeId, {'__v': 0});

    if (employee === null) {
        throw new AppError('Employee not found.', 404);
    }

    await EmployeeModel.findByIdAndDelete(employeeId);
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    removeEmployee
};