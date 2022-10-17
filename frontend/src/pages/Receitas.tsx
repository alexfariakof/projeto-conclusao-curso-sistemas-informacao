import { useState } from 'react';
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import { LayoutMasterPage } from "../shared/layouts";
import { Save } from '@mui/icons-material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import { BarraFerramentas } from '../shared/components';

interface State {
    amount: string;
}
export const Receitas = () => {
    const [values, setValues] = useState<State>({
        amount: '',
    });

    const [categoria, setCategoria] = useState('');

    const [valueData, setValueData] = useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );


    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChangeCategoria = (event: SelectChangeEvent) => {
        setCategoria(event.target.value);
    };

    const handleChangeData = (newValue: Dayjs | null) => {
        setValueData(newValue);
    };

    return (
        <LayoutMasterPage 
        titulo='Receitas' 
        barraDeFerramentas={(
            <BarraFerramentas  />
          )}
        >
            <Box
                gap={1}
                margin={2}
                padding={1}
                paddingX={2}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="start"
                component={Paper} >

                <FormControl size="small" fullWidth  >
                    <InputLabel id="txtCategoria">Categoria</InputLabel>
                    <Select
                        labelId="txtCategoria"
                        id="txtReceita"
                        value={categoria}
                        label="Categoria"
                        onChange={handleChangeCategoria}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Alimentação</MenuItem>
                        <MenuItem value={20}>Educação</MenuItem>
                        <MenuItem value={30}>Transporte</MenuItem>
                        <MenuItem value={30}>Lazer</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" fullWidth  >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} >
                            <DesktopDatePicker
                                label="Data"
                                inputFormat="MM/DD/YYYY"
                                value={valueData}
                                onChange={handleChangeData}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </FormControl>
                <TextField size="small" label="Descrição" inputProps={{ maxLength: 50 }} fullWidth />
                <FormControl size="small" fullWidth variant="outlined" >
                    <InputLabel htmlFor="txtValor">Valor</InputLabel>
                    <OutlinedInput
                        id="txtValor"
                        value={values.amount}
                        onChange={handleChange('amount')}
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        label="Valor"
                        type="number"
                    />
                </FormControl>
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    startIcon={<Save />}
                >Salvar</Button>
            </Box>
        </LayoutMasterPage>
    );
}