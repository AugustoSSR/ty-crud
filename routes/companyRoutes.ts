import express, { Request, Response } from 'express';
import {
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
} from '../controllers/companyController';

const router = express.Router();

router.get('/companies', getAllCompanies);
router.post('/companies', createCompany);
router.put('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);

export default router;
