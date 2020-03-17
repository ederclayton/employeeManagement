const employeeServices = require('../services/employeeServices');

exports.newEmployee = async (req, res) => {
    try {
        const { name, position, salary } = req.body;
        
        const newEmployee = await employeeServices.createEmployee(name, position, salary);
    
        res.status(200).json( newEmployee );
    } catch (error) {
        if (error.status) {
            res.status(error.status).json( {message: error.message} );
        } else {
            console.log(error.message);
            res.status(500).json( {message: 'Internal Error'} );
        }
    }
};

exports.getAllEmployee = async (req, res) => {
    try {
        const all = await employeeServices.getEmployees();
        res.status(200).json(all);
    } catch (error) {
        if (error.status) {
            res.status(error.status).json( {message: error.message} );
        } else {
            console.log(error.message);
            res.status(500).json( {message: 'Internal Error'} );
        }
    }
};

exports.getEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await employeeServices.getEmployee(employeeId);
        res.status(200).json( employee );
    } catch (error) {
        if (error.status) {
            res.status(error.status).json( {message: error.message} );
        } else {
            console.log(error.message);
            res.status(500).json( {message: 'Internal Error'} );
        }
    }
};

exports.editEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const { name, position, salary } = req.body;
        const newEmployee = await employeeServices.updateEmployee(employeeId, name, position, salary);
        res.status(200).json( newEmployee );
    } catch (error) {
        if (error.status) {
            res.status(error.status).json( {message: error.message} );
        } else {
            console.log(error.message);
            res.status(500).json( {message: 'Internal Error'} );
        }
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        await employeeServices.removeEmployee(employeeId);
        res.status(200).json( {message: `Employee with id ${employeeId} successfully removed.`} );
    } catch (error) {
        if (error.status) {
            res.status(error.status).json( {message: error.message} );
        } else {
            console.log(error.message);
            res.status(500).json( {message: 'Internal Error'} );
        }
    }
};