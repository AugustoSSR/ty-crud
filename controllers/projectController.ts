import { Request, Response } from 'express';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'seu_banco_de_dados',
    password: 'sua_senha',
    port: 5432,
});

// Função para listar todos os projetos
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT * FROM projetos');
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar projetos', err);
        res.status(500).send('Erro ao buscar projetos');
    }
};

// Função para criar um novo projeto
export const createProject = async (req: Request, res: Response) => {
    const { nome_projeto, empresa_id, cidade, data_criacao, status_projeto, quantidade_medida } = req.body;

    // Lógica para validar e processar os dados recebidos

    try {
        // Inserir o novo projeto no banco de dados
        const query = 'INSERT INTO projetos (nome_projeto, empresa_id, cidade, data_criacao, status_projeto, quantidade_medida) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [nome_projeto, empresa_id, cidade, data_criacao, status_projeto, quantidade_medida];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao criar o projeto', err);
        res.status(500).send('Erro ao criar o projeto');
    }
};

// Função para atualizar um projeto existente
export const updateProject = async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.id, 10);
    const { nome_projeto, empresa_id, cidade, data_criacao, status_projeto, quantidade_medida } = req.body;

    // Lógica para validar e processar os dados recebidos

    try {
        // Atualizar o projeto no banco de dados
        const query = 'UPDATE projetos SET nome_projeto = $1, empresa_id = $2, cidade = $3, data_criacao = $4, status_projeto = $5, quantidade_medida = $6 WHERE id = $7 RETURNING *';
        const values = [nome_projeto, empresa_id, cidade, data_criacao, status_projeto, quantidade_medida, projectId];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao atualizar o projeto', err);
        res.status(500).send('Erro ao atualizar o projeto');
    }
};

// Função para excluir um projeto
export const deleteProject = async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.id, 10);

    try {
        // Excluir o projeto do banco de dados
        const query = 'DELETE FROM projetos WHERE id = $1 RETURNING *';
        const values = [projectId];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao excluir o projeto', err);
        res.status(500).send('Erro ao excluir o projeto');
    }
};
