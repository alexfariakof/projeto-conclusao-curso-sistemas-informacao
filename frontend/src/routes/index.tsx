import { useEffect } from 'react'
import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages/Dashboard';
import { Despesas } from '../pages/Despesas';
import { Lancamentos } from '../pages/Lancamentos';
import { Receitas } from '../pages/Receitas';
import { PrimeiroAcesso } from '../pages/PrimeiroAcesso';


export const AppRoutes = () => {
    const { toggleTheme } = useAppThemeContext();
    const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();    

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Home'
            },
            {
                icon: 'listalt',
                path: '/despesas',
                label: 'Despesas'
            },
            {
                icon: 'listalt',
                path: '/receitas',
                label: 'Receitas'
            },
            {
                icon: 'viewlist',
                path: '/lancamentos',
                label: 'Lançamentos'
            }
        ]);
    }, [setDrawerOptions]);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard />} />
            <Route path='/despesas' element={<Despesas />} />
            <Route path='/despesas/:id' element={<Despesas />} />
            <Route path='/receitas' element={<Receitas />} />
            <Route path='/categorias' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Categoria</Button>} />
            <Route path='/lancamentos' element={<Lancamentos />} />
            <Route path='/configuracoes' element={<Button variant='contained' color='primary' onClick={toggleTheme} >Configurações</Button>} />
            <Route path='/sair' />
            <Route path='/primeiro-acesso' element={<Navigate to='primeiro-acesso' />} />
            <Route path='/alterar-senha' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Aletar Senha</Button>} />
            <Route path='/esqueci-senha' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Esqueci minha senha</Button>} />
            <Route path='/auth' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Login</Button>} />
            {<Route path='*' element={<Navigate to='pagina-inicial' />} />}
        </Routes>

    )
}