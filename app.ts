import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
import projectRoutes from './routes/projectRoutes';
import companyRoutes from './routes/companyRoutes';
import employeeRoutes from './routes/employeeRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(taskRoutes);
app.use(projectRoutes);
app.use(companyRoutes);
app.use(employeeRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
