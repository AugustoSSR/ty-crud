import express, { Request, Response } from 'express';
import {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from '../controllers/employeeController';

const router = express.Router();

router.get('/employees', getAllEmployees);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;
