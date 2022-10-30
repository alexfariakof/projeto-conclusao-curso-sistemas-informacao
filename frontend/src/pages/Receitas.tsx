import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { Save } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BarraFerramentas } from '../shared/components';
import { LayoutMasterPage } from "../shared/layouts";
import { ReceitasService, IReceitaVO } from '../shared/services/api';

interface State {
    idUsuario: number;
    idCategoria: string;
    data: Dayjs | null;
    descricao: string;
    valor: number;        
}

export const Receitas: React.FC = () => {
    const navigate = useNavigate();
    const { id = 0 } = useParams<'id'>();
    const [values, setValues] = useState<State>({
        idUsuario: 0,
        valor: 0,
        descricao: '',
        idCategoria: '0',
        data: dayjs('2014-08-18T21:11:54'),
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChangeCategoria = (event: SelectChangeEvent) => {
        setValues({ ...values, idCategoria: event.target.value});
    };

    const handleChangeData = (newValue: Dayjs | null) => {
        setValues({...values, data: newValue })
    };

    const handleSave = () => {
        let dados: IReceitaVO;
        dados = {
            id: Number(id),
            idUsuario: Number(localStorage.getItem('idUsuario')),
            idCategoria: Number(values.idCategoria),
            data: values.data,
            descricao: values.descricao,
            valor: values.valor,
        };

        if (id === 0) {
            ReceitasService
                .create(dados)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } 
                    else {
                        if (dados.id === 0 && result.message === true) {
                            alert('Recetita cadastrada com sucesso!');
                            handleClear();
                        }
                        else {
                            alert('Recetita atualizada com sucesso!');
                            navigate(`/lancamentos`);
                        }
                    }
                });
        } else {
            ReceitasService
                .updateById(Number(id), dados)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        if (true) {
                            navigate('/Receitas');
                        }
                    }
                });
        }
    }

    const handleEdit = (recetita: IReceitaVO)  => {
        
        setValues({
            idUsuario: recetita.idUsuario,
            idCategoria: recetita.idCategoria.toString(),
            data: recetita.data,
            descricao: recetita.descricao,
            valor: recetita.valor       
        });

    }

    const handleClear = () => {
        setValues({
            ...values,
            idCategoria: '0',
            data: dayjs('2014-08-18T21:11:54'),
            descricao: '',
            valor: 0                
        });
    }

    useEffect(() => {
        if (id !== 0) {
            ReceitasService.getById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    }
                    else {
                        handleEdit(result);
                        console.log(result.id);
                    }
                });
        }
    }, [id])

    return (

        <LayoutMasterPage
            titulo='Receitas'
            barraDeFerramentas={(
                <BarraFerramentas
                    isOpenTxtBusca={true}
                    btnVoltar onClickVoltar={() => navigate('/lancamentos')}
                    btnNovo onClickNovo={() => handleClear()} 
                    btnSalvar onClickSalvar={() => handleSave()} />
            )}
        >
            <Box
                gap={1}
                margin={1}
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
                        id="txtCategoria"
                        value={values.idCategoria}
                        label="Categoria"
                        onChange={handleChangeCategoria}
                    >
                        <MenuItem value={0}>
                            <em>Nenhuma Categoria Selecionada</em>
                        </MenuItem>                        
                        <MenuItem value={8}>Salário</MenuItem>
                        <MenuItem value={9}>Prêmio</MenuItem>
                        <MenuItem value={10}>Investimento</MenuItem>
                        <MenuItem value={11}>Benefício</MenuItem>
                        <MenuItem value={12}>Outro</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" fullWidth  >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} >
                            <DesktopDatePicker
                                label="Data"
                                inputFormat="DD/MM/YYYY"
                                value={values.data}
                                onChange={handleChangeData}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </FormControl>
                <TextField size="small" label="Descrição" inputProps={{ maxLength: 50 }} fullWidth
                    value={values.descricao}
                    onChange={handleChange('descricao')}
                />
                <FormControl size="small" fullWidth variant="outlined" >
                    <InputLabel htmlFor="txtValor">Valor</InputLabel>
                    <OutlinedInput
                        id="txtValor"
                        value={values.valor}
                        onChange={handleChange('valor')}
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        label="Valor"
                        type="number"
                    />
                </FormControl>
            </Box>
        </LayoutMasterPage>
    );
}
