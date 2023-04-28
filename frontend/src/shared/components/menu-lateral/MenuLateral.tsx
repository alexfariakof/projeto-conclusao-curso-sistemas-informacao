import React from 'react';
import { Avatar, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewListIcon from '@mui/icons-material/ViewList';
import ListAltIcon from '@mui/icons-material/ListAlt';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuthContext, useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IListItemLinkProps {
    to: string,
    icon: string,
    label: String,
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false })

    /* Atenção verificar se existe a necessidade do uso de useCallBack */
    const handleClick = () => {
        navigate(to);
        onClick?.();
        /*/onClick && onClick(); ou if(onClick) onClick()*/
    };

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                {(() => {
                    switch (icon) {
                        case "home": return <HomeIcon />;
                        case "star": return <StarIcon />;
                        case "settings": return <SettingsIcon />;
                        case "logout" : return <LogoutIcon />;
                        case "viewlist" : return <ViewListIcon />;
                        case "listalt" : return <ListAltIcon />;
                        
                        default: return undefined;
                    }
                })()}
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

export const MenuLateral: React.FC<React.PropsWithChildren> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions  } = useDrawerContext()
    const { logout } = useAuthContext();
    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen} >
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar
                            alt="Alex Ribeiro"
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="_perfil.png" />
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List component="nav" >
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink
                                    to={drawerOptions.path}                                    
                                    icon={drawerOptions.icon}
                                    label={drawerOptions.label}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                    key={drawerOptions.path}
                                />
                            ))}

                            <Divider />
                            <ListItemLink
                                icon='settings'
                                to='configuracoes'
                                label='Configurações'
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                            <ListItemLink
                                icon='logout'
                                to=''
                                label='Sair'
                                onClick={() => logout()}
                            />
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};