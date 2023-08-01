import { Request, Response } from 'express';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'seu_banco_de_dados',
    password: 'sua_senha',
    port: 5432,
});

// Função para listar todas as empresas
export const getAllCompanies = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT * FROM empresas');
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar empresas', err);
        res.status(500).send('Erro ao buscar empresas');
    }
};

// Função para criar uma nova empresa
export const createCompany = async (req: Request, res: Response) => {
    const { nome_empresa, cnpj } = req.body;

    // Lógica para validar e processar os dados recebidos

    try {
        // Inserir a nova empresa no banco de dados
        const query = 'INSERT INTO empresas (nome_empresa, cnpj) VALUES ($1, $2) RETURNING *';
        const values = [nome_empresa, cnpj];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao criar a empresa', err);
        res.status(500).send('Erro ao criar a empresa');
    }
};

// Função para atualizar uma empresa existente
export const updateCompany = async (req: Request, res: Response) => {
    const companyId = parseInt(req.params.id, 10);
    const { nome_empresa, cnpj } = req.body;

    // Lógica para validar e processar os dados recebidos

    try {
        // Atualizar a empresa no banco de dados
        const query = 'UPDATE empresas SET nome_empresa = $1, cnpj = $2 WHERE id = $3 RETURNING *';
        const values = [nome_empresa, cnpj, companyId];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao atualizar a empresa', err);
        res.status(500).send('Erro ao atualizar a empresa');
    }
};

// Função para excluir uma empresa
export const deleteCompany = async (req: Request, res: Response) => {
    const companyId = parseInt(req.params.id, 10);

    try {
        // Excluir a empresa do banco de dados
        const query = 'DELETE FROM empresas WHERE id = $1 RETURNING *';
        const values = [companyId];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error('Erro ao excluir a empresa', err);
        res.status(500).send('Erro ao excluir a empresa');
    }
};
