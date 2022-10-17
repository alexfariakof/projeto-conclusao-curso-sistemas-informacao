import { Typography, Theme, useTheme, useMediaQuery, IconButton, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';
import MenuIcon from '@mui/icons-material/Menu';


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
            <Box padding={1} display="flex" alignItems="center" height={theme.spacing(12)} >
                {smDown && (

                    <IconButton onClick={toggleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant='h5'>
                    {titulo}
                </Typography>
            </Box>

            {barraDeFerramentas && (
                <Box>
                    {barraDeFerramentas}
                </Box>
            )}

            <Box height="100%" display="flex" flexDirection="column" bgcolor={'red'} >
                {children}
            </Box>
        </Box>
    );
};