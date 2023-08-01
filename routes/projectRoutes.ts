import express, { Request, Response } from 'express';
import {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
} from '../controllers/projectController';

const router = express.Router();

router.get('/projects', getAllProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

export default router;
