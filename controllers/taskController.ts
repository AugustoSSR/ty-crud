import { Request, Response } from 'express';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'seu_banco_de_dados',
    password: 'sua_senha',
    port: 5432,
});

// Função para listar todas as tarefas
export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT * FROM tarefas');
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar tarefas', err);
        res.status(500).send('Erro ao buscar tarefas');
    }
};

// Função para criar uma nova tarefa
export const createTask = async (req: Request, res: Response) => {
    const { nome_tarefa, funcionarios_ids, data_conclusao, status_tarefa, projetos_ids } = req.body;

    // Lógica para validar e processar os dados recebidos

    try {
        // Inserir a nova tarefa no banco de dados
        const query = 'INSERT INTO tarefas (nome_tarefa, funcionarios_ids, data_conclusao, data_criacao, status_tarefa, projetos_ids) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [nome_tarefa, funcionarios_ids, data_conclusao, new Date(), status_tarefa, projetos_ids];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao criar a tarefa', err);
        res.status(500).send('Erro ao criar a tarefa');
    }
};

// Função para atualizar uma tarefa existente
export const updateTask = async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id, 10);
    const { nome_tarefa, funcionarios_ids, data_conclusao, status_tarefa, projetos_ids } = req.body;

    // Lógica para validar e processar os dados recebidos

    try {
        // Atualizar a tarefa no banco de dados
        const query = 'UPDATE tarefas SET nome_tarefa = $1, funcionarios_ids = $2, data_conclusao = $3, status_tarefa = $4, projetos_ids = $5 WHERE id = $6 RETURNING *';
        const values = [nome_tarefa, funcionarios_ids, data_conclusao, status_tarefa, projetos_ids, taskId];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao atualizar a tarefa', err);
        res.status(500).send('Erro ao atualizar a tarefa');
    }
};

// Função para excluir uma tarefa
export const deleteTask = async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id, 10);

    try {
        // Excluir a tarefa do banco de dados
        const query = 'DELETE FROM tarefas WHERE id = $1 RETURNING *';
        const values = [taskId];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao excluir a tarefa', err);
        res.status(500).send('Erro ao excluir a tarefa');
    }
};
