import { Api } from "../../axios-config";


export interface ControleAcessoVO {
    Nome: string;
    Telefone: string;
    Email: string;
    Senha: string
} 

const auth = async (email: string, password: string): Promise<any> => {
    try {        
        let dados = { Email: email,  Senha: password };        

        const  { data } = await Api.post('/ControleAcesso/SignIn', dados);
        if (data) {
            return data;
        }

        return Error('Erro services Auth.');
    } catch (error) {

         console.log(error);
        return Error((error as { message: string }).message || 'Erro services Auth.');
    }
};

const recoveryPassword = async (email: string): Promise<any> => {
    try {
        const  { data } = await Api.get('/ControleAcesso/RecoveryPassword/' + email);
        if (data) {
            return data;
        }

        return Error('Erro ao enviar email.');
    } catch (error) {

         console.log(error);
        return Error((error as { message: string }).message || 'Erro ao enviar email.');
    }

}

const createUsuario = async (dados: Omit<ControleAcessoVO, ''>):  Promise<any | Error> => {
    try {
        const  { data } = await Api.post<ControleAcessoVO>('/ControleAcesso', dados);
        if (data) {
            return data;
        }

        return Error('Erro Authservices ao criar usuário.');
    } catch (error) {

         console.log(error);
        return Error((error as { message: string }).message || 'Erro Authservices ao criar usuário.');
    }

};

export const AuthService = { 
    auth,
    recoveryPassword,
    createUsuario
};