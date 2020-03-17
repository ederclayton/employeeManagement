const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');

router.post('/', controller.newEmployee);
router.get('/all', controller.getAllEmployee);
router.get('/:id', controller.getEmployee);
router.put('/:id', controller.editEmployee);
router.delete('/:id', controller.deleteEmployee);

module.exports = router;