import { createContext, useCallback, useState, useContext, useMemo, useEffect } from 'react';
import { AuthService } from '../services/api';


interface IAuthContextData {
    isAuthenticated: boolean;
    logout: () => void;
    login: (email: string, password: string) => Promise<string | void>;
}

interface IAuthProviderProps {
    children: React.ReactNode
}


const AuthContext = createContext({} as IAuthContextData);


export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string>();

    useEffect(() => {
        const accessToken = localStorage.getItem('@dpApiAccess');

        if(accessToken){
            setAccessToken(JSON.parse(accessToken));
        }
        else{
            setAccessToken(undefined);
        }
    }, []);

    const handleLogin = useCallback(async (email: string, password: string) => {
        //Forçando Login 
        return "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJ0ZXN0ZUB0ZXN0ZTEiLCJ0ZXN0ZUB0ZXN0ZTEiXSwianRpIjoiMjA0ZDI3M2U4NjdjNGNjNDliMjM0MWI4OTVhZWVlMzciLCJuYmYiOjE2NjYxODcwNjAsImV4cCI6MTY2NjE4ODI2MCwiaWF0IjoxNjY2MTg3MDYwLCJpc3MiOiJFeGVtcGxlSXNzdWVyIiwiYXVkIjoiRXhlbXBsZUF1ZGllbmNlIn0.NaP4g73KKUiRstFAhV9YGMO2AnLwA0S7RRo70H_1EgDT0r6WuIzeui-QNw2Bzu3q4GvOA05rGsNiVXTPFExBV6n95KgLnaYS-JzF1i63pDd4RyBONTlOgOQnrsttrTZ0Lzz-ACu2g_03oDVME9ha_WlDF0p2mMC37M_uakt3fj9mRzuqNZOniLrbQg7sBULRKVq0TzFSX_Hsfd2CPlIGFATTUJ1_3ZKfFl2Y7nz933MhWNCo707vD_AZtsZuiUfDP5p96qpa02CLgYoHMjiDp4w0fRu0CJ3KIOiAXM0l0mtZ3TyLxDyFBdsispuhxkeVOafaClpMV6HDht-7PtJTKA";
        const result = await AuthService.auth(email, password);
        if (result instanceof Error){
            return result.message;
        }
        else{
            localStorage.setItem('@dpApiAccess', JSON.stringify(result.accessToken));
            setAccessToken(result);
        }

    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('@dpApiAccess');
        setAccessToken(undefined);
    }, []);

    const handleIsAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    return (
        <AuthContext.Provider value={{ isAuthenticated: handleIsAuthenticated, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);