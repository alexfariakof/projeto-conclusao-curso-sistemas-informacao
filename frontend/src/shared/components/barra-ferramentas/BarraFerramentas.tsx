import { useState } from 'react';
import { Box,  Button, Paper, TextField, useTheme, FormControl } from "@mui/material";
import Stack from '@mui/material/Stack';
import SalvarIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {  DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface IBarraFerramentasProps {
    children?: React.ReactNode;
    textBusca?: string;
    isOpenTxtBusca?: boolean;
    isOpenDataMesAno? : boolean;
    btnSalvar?: boolean;
    btnNovo?: boolean;
    btnVoltar?: boolean;
    onClickSalvar?: () => void;
    onClickNovo?: () => void;
    onClickVoltar?: () => void;
};

export const BarraFerramentas: React.FC<IBarraFerramentasProps> = ({ 
    children,
    textBusca = '',
    isOpenTxtBusca = false,
    isOpenDataMesAno = false,
    btnSalvar = true,
    btnNovo = true,
    btnVoltar = true, 
    onClickSalvar,
    onClickNovo,
    onClickVoltar,
}) => {

    const theme = useTheme();
    const [value, setValue] = useState<Dayjs | null>(null);

    return (
        <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" gap={1} component={Paper} >
            {isOpenDataMesAno && (

                <FormControl   >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} >
                            <DesktopDatePicker                                                                
                                label="Data"
                                value={value}
                                openTo="year"
                                inputFormat="MM/YYYY"
                                onChange={(newValue) => {
                                   setValue(newValue);
                                }}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </FormControl>
            )}
            {isOpenTxtBusca && (
                <TextField size="small" placeholder="Pesquisar" />
            )}
            <Box flex={1} display="flex" justifyContent="end" paddingX={1} gap={1} >
                {btnSalvar && (
                    <Button size="small" variant='contained' color='success' disableElevation startIcon={<SalvarIcon />}  onClick={onClickSalvar}  >Salvar</Button>
                )}

                {btnNovo && (
                    <Button size="small" variant='contained'  disableElevation startIcon={<AddIcon />}  onClick={onClickNovo}  >Novo</Button>
                )}
                {btnVoltar && (
                    <Button size="small" variant='contained'  disableElevation startIcon={<ArrowBackIcon />}  onClick={onClickVoltar} >Voltar</Button>
                )}
            </Box>
        </Box>
    );

}