import express from "express"
const router=express.Router();
import { getEmployee,getAllEmployees,createEmployee, updateEmployee, deleteEmployee} from "../controllers/employeeController.js";
// Route to get all employees
router.get('/employees', getAllEmployees);

// Route to get a single employee by ID
router.get('/employee/:id', getEmployee);

// Route to create a new employee
router.post('/employees/create', createEmployee);

// Route to update an employee by ID
router.put('/employees/:id', updateEmployee);
// delete employee
router.delete('/employees/delete/:id',deleteEmployee)

export default router