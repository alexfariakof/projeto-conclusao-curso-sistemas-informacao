import { Api } from "../../axios-config";

const auth = async (email: string, password: string): Promise<any> => {
    try {
        const  { data } = await Api.get('/ControleAcesso/SignIn/' + email + '/' + password );
        if (data) {
            return data;
        }

        return Error('Erro login.');
    } catch (error) {

         console.log(error);
        return Error((error as { message: string }).message || 'Erro login.');
    }
};


export const AuthService = { 
    auth
};