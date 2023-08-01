interface Project {
    id: number;
    nome_projeto: string;
    empresa_id: number;
    cidade: string;
    data_criacao: Date;
    status_projeto: string;
    quantidade_medida: number;
}

export default Project;
