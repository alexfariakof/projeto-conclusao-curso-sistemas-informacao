import { useContext, useState } from 'react';

export interface IUsuario {
    Id: number;
    Nome: string;
    Telefone: string;
    Email: string; 
}

export const User: React.FC = () => {
    const [values, setValues] = useState<IUsuario>();    
};

export const useAuthContext = () => useContext(User);