import { Typography, Theme, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';
import MenuIcon from '@mui/icons-material/Menu';
import Relogio from '../components/relogio/Relogio';


interface ILayoutMasterPageProps {
    children: React.ReactNode;
    titulo: string;
    barraDeFerramentas?: React.ReactNode;
}

export const LayoutMasterPage: React.FC<ILayoutMasterPageProps> = ({ children, titulo, barraDeFerramentas }) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const theme = useTheme();
    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} display="flex" alignItems="center" height={theme.spacing(8)} >
                {smDown && (

                    <IconButton onClick={toggleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                )}
                <Box display="flex" flexDirection="row" width="100%"  >
                    <Box textAlign={'left'} padding={1}>
                        <Typography variant='h5' >
                            {titulo}
                        </Typography>
                    </Box>
                    <Box textAlign="right" width="100%" gap={1} padding={1} fontFamily={'Audiowide'}>
                        <Relogio />
                    </Box>
                </Box>
            </Box>

            {barraDeFerramentas && (
                <Box>
                    {barraDeFerramentas}
                </Box>
            )}

            <Box height="100%" width='100%' display="flex" margin={0} flexDirection="column" bgcolor='#00F12F' >
                {children}
            </Box>
        </Box>
    );
};