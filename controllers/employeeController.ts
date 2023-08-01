import { Request, Response } from 'express';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'seu_banco_de_dados',
    password: 'sua_senha',
    port: 5432,
});

// Função para listar todos os funcionários
export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT * FROM funcionarios');
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar funcionários', err);
        res.status(500).send('Erro ao buscar funcionários');
    }
};

// Função para criar um novo funcionário
export const createEmployee = async (req: Request, res: Response) => {
    const { nome, cargo } = req.body;

    // Lógica para validar e processar os dados recebidos

    try {
        // Inserir o novo funcionário no banco de dados
        const query = 'INSERT INTO funcionarios (nome, cargo) VALUES ($1, $2) RETURNING *';
        const values = [nome, cargo];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao criar o funcionário', err);
        res.status(500).send('Erro ao criar o funcionário');
    }
};

// Função para atualizar um funcionário existente
export const updateEmployee = async (req: Request, res: Response) => {
    const employeeId = parseInt(req.params.id, 10);
    const { nome, cargo } = req.body;

    // Lógica para validar e processar os dados recebidos

    try {
        // Atualizar o funcionário no banco de dados
        const query = 'UPDATE funcionarios SET nome = $1, cargo = $2 WHERE id = $3 RETURNING *';
        const values = [nome, cargo, employeeId];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao atualizar o funcionário', err);
        res.status(500).send('Erro ao atualizar o funcionário');
    }
};

// Função para excluir um funcionário
export const deleteEmployee = async (req: Request, res: Response) => {
    const employeeId = parseInt(req.params.id, 10);

    try {
        // Excluir o funcionário do banco de dados
        const query = 'DELETE FROM funcionarios WHERE id = $1 RETURNING *';
        const values = [employeeId];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao excluir o funcionário', err);
        res.status(500).send('Erro ao excluir o funcionário');
    }
};
