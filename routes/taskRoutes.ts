import express, { Request, Response } from 'express';
import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
} from '../controllers/taskController';

const router = express.Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
