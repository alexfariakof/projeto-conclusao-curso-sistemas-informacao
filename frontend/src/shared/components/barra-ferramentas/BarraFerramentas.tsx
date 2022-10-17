import { Box,  Button, Paper, TextField, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IBarraFerramentasProps {
    children?: React.ReactNode;
    textBusca?: string;
    btnNovo?: boolean;
    btnVoltar?: boolean;
    onClickNovo?: () => void;
    onClickVoltar?: () => void;
};

export const BarraFerramentas: React.FC<IBarraFerramentasProps> = ({ 
    children,
    textBusca = '',
    btnNovo = true,
    btnVoltar = true, 
    onClickNovo,
    onClickVoltar,
}) => {

    const theme = useTheme();

    return (
        <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" gap={1} component={Paper} >

            <TextField size="small" placeholder="Pesquisar" />

            <Box flex={1} display="flex" justifyContent="end" paddingX={1} gap={1} >
                {btnNovo && (
                    <Button size="small" variant='contained' color='info' startIcon={<AddIcon></AddIcon>}  onClick={onClickNovo}  >Novo</Button>
                )}
                {btnVoltar && (
                    <Button size="small" variant='contained' color='info' startIcon={<ArrowBackIcon></ArrowBackIcon>}  onClick={onClickVoltar} >Voltar</Button>
                )}
            </Box>
        </Box>
    );

}