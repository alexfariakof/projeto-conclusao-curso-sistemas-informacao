import { Api } from "../axios-config";
import { Dayjs } from "dayjs";

export interface IReceitaVO {
    id:number;
    idUsuario: number;
    idCategoria: Number;
    data: Dayjs | null;
    descricao: string;
    valor: number;
}

const getAll = async (): Promise<IReceitaVO[] | Error> => {
    try {
        const { data } = await Api.get('/Receita');
        if (data) {
            return data;
        }

        return Error('Erro getAll ao listar receitas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getAll ao listar receitas.');
    }
};

const getById = async (id: Number): Promise<IReceitaVO | Error> => {
    try {
        const { data } = await Api.get('/Receita/' + id);
        if (data) {
            return data.receita as IReceitaVO;
        }

        return Error('Erro getById ao pesquisar receitas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getById ao pesquisar receitas.');
    }
};

const create = async (dados: Omit<IReceitaVO, 'id'>): Promise<any | Error> => {
    try {
        const { data } = await Api.post<IReceitaVO>('/Receita', dados );
        if (data) {
            return data.id
        }

        return Error('Erro ao criar novo registro de receita.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao criar novo registro de receita.');
    }
};


const updateById = async (id: number, dados: IReceitaVO): Promise<IReceitaVO | Error> => {
    try {
        dados.id = id;
        const { data } = await Api.put<IReceitaVO>('/Receita', dados);
        if (data) {
            return data
        }

        return Error('Erro ao atualizar registro de receita.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao atualizar registro de receita.');
    }

 };

const deleteById = async (id: number): Promise<any | Error> => { 
    try {
        const { data } = await Api.delete('/Receita/' + id);
        if (data.message) {
            return Boolean(data)
        }

        return Error('Erro ao deletar registro de receita.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao deletar registro de receita.');
    }

};

export const ReceitasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};