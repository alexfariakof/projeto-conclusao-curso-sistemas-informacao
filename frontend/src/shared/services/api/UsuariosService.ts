import { Api } from "../axios-config";

const getAll = async (): Promise<any> => {
    try {
        const  {data}  = await Api.get('/usuario');
        if(data){
            return { data };
        }
        
        return Error('Erro ao listarc usuários.');
    } catch (error) {
        console.log(error);
        return Error((error as {message: string}).message || 'Erro ao listar usuários.');
    }
};

const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

export const UsuariosService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};