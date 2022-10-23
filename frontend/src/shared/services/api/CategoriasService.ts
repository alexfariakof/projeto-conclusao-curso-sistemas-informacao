import { Api } from "../axios-config";

export interface ICategoriaVO {
    Id:number;
    IdTipoCategoria : number;
    Descricao: string;
    IdUsuario: Number;    
}

const getAll = async (): Promise<ICategoriaVO[] | Error> => {
    try {
        const { data } = await Api.get('/Categoria');
        if (data) {
            return data;
        }

        return Error('Erro getAll ao listar Categorias.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getAll ao listar Categorias.');
    }
};

const getById = async (id: number): Promise<ICategoriaVO | Error> => {
    try {
        const { data } = await Api.get('/Categoria/$(id)');
        if (data) {
            return data;
        }

        return Error('Erro getById ao pesquisar Categorias.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getById ao pesquisar Categorias.');
    }
};

const getByTipoCategoria = async (idUsuario: number, idTipoCategoria: number): Promise<ICategoriaVO[] | Error> => {
    try {
        const { data } = await Api.get('/Categoria/byTipoCategoria/$(idUsuario)/$(idTipoCategoria)');
        if (data) {
            return data;
        }

        return Error('Erro getById ao pesquisar Categorias.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getById ao pesquisar Categorias.');
    }
};

const create = async (dados: Omit<ICategoriaVO, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post<ICategoriaVO>('/Categoria', dados );
        if (data) {
            return data.Id
        }

        return Error('Erro ao criar novo registro de Categoria.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao criar novo registro de Categoria.');
    }
};


const updateById = async (id: number, dados: ICategoriaVO): Promise<ICategoriaVO | Error> => {
    try {
        dados.Id = id;
        const { data } = await Api.put<ICategoriaVO>('/Categoria', dados);
        if (data) {
            return data
        }

        return Error('Erro ao atualizar registro de Categoria.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao atualizar registro de Categoria.');
    }

 };

const deleteById = async (id: number): Promise<void | Error> => { 
    try {
        const { data } = await Api.delete('/Categoria/$(id)');
        if (data) {
            return data.id
        }

        return Error('Erro ao deletar registro de Categoria.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao deletar registro de Categoria.');
    }

};

export const CategoriasService = {
    getAll,
    getById,
    getByTipoCategoria,
    create,
    updateById,
    deleteById
};