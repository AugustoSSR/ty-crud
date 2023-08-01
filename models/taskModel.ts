interface Task {
    id: number;
    nome_tarefa: string;
    funcionarios_ids: number[];
    data_conclusao: Date | null;
    data_criacao: Date;
    status_tarefa: string;
    projetos_ids: number[];
}

export default Task;
