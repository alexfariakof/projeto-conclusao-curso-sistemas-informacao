import { Api } from "../axios-config";
import { Dayjs } from "dayjs";

export interface IDespesaVO {
    id:number;
    idUsuario: number;
    idCategoria: number;
    data: Dayjs | null;
    descricao: string;
    valor: number;
    dataVencimento: Dayjs | null;
}

const getAll = async (): Promise<IDespesaVO[] | Error> => {
    try {
        const { data } = await Api.get('/despesa');
        if (data) {
            return data;
        }

        return Error('Erro ao listar despesas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao listar despesas.');
    }
};

const getById = async (id: number): Promise<IDespesaVO | Error> => {
    try {
        const { data } = await Api.get('/despesa/' + id);
        if (data) {
            return data.despesa as IDespesaVO;
        }

        return Error('Erro ao pesquisar despesas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao pesquisar despesas.');
    }
};

const create = async (dados: Omit<IDespesaVO, 'id'>): Promise<any | Error> => {
    try {
        const { data } = await Api.post<IDespesaVO>('/despesa', dados );
        if (data) {
            return data;
        }

        return Error('Erro ao criar novo registro de despesas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao criar novo registro de despesas.');
    }
};

const updateById = async (id: number, dados: IDespesaVO): Promise<IDespesaVO | Error> => {
    try {
        dados.id = id;
        const { data } = await Api.put<IDespesaVO>('/despesa', dados);
        if (data) {
            return data
        }

        return Error('Erro ao atualizar registro de despesas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao atualizar registro de despesas.');
    }

 };

const deleteById = async (id: number): Promise<any | Error> => { 
    try {
        const { data } = await Api.delete('/despesa/'+ id);
        if (data.message === true) {
            return Boolean(data.message);
        }

        return Error('Erro ao deletar registro de despesas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao deletar registro de despesas.');
    }

};

export const DespesasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};