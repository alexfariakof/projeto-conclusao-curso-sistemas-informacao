import { Api } from "../axios-config";

export interface IUsuarioVO {
    Id:number;
    Nome: string;
    Telefone: string;
    Email: string;
}

const getAll = async (): Promise<IUsuarioVO[] | Error> => {
    try {
        const { data } = await Api.get('/Usuario');
        if (data) {
            return data;
        }

        return Error('Erro getAll ao listar Usuarios.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getAll ao listar Usuarios.');
    }
};

const getById = async (id: Number): Promise<IUsuarioVO | Error> => {
    try {
        const { data } = await Api.get('/Usuario/$(id)');
        if (data) {
            return data;
        }

        return Error('Erro getById ao pesquisar Usuarios.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getById ao pesquisar Usuarios.');
    }
};

const create = async (dados: Omit<IUsuarioVO, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post<IUsuarioVO>('/Usuario', dados );
        if (data) {
            return data.Id
        }

        return Error('Erro ao criar novo registro de Usuario.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao criar novo registro de Usuario.');
    }
};


const updateById = async (id: number, dados: IUsuarioVO): Promise<IUsuarioVO | Error> => {
    try {
        dados.Id = id;
        const { data } = await Api.put<IUsuarioVO>('/Usuario', dados);
        if (data) {
            return data
        }

        return Error('Erro ao atualizar registro de Usuario.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao atualizar registro de Usuario.');
    }

 };

const deleteById = async (id: number): Promise<void | Error> => { 
    try {
        const { data } = await Api.delete('/Usuario/$(id)');
        if (data) {
            return data.id
        }

        return Error('Erro ao deletar registro de Usuario.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao deletar registro de Usuario.');
    }

};

export const UsuariosService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};