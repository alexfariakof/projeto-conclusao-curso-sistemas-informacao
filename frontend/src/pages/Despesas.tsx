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
import { DespesasService, IDespesaVO } from '../shared/services/api';

interface State {
    idUsuario: number;
    idCategoria: string;
    data: Dayjs | null;
    descricao: string;
    dtVencimento: Dayjs | null;    
    valor: number;        
}

export const Despesas: React.FC = () => {
    const navigate = useNavigate();
    const { id = 0 } = useParams<'id'>();
    const [values, setValues] = useState<State>({
        idUsuario: 0,
        valor: 0,
        descricao: '',
        idCategoria: '0',
        data: dayjs('2014-08-18T21:11:54'),
        dtVencimento: dayjs('2014-08-18T21:11:54')
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

    const handleChangeDataVencimento = (newValue: Dayjs | null) => {
        setValues({...values, dtVencimento: newValue })
    };

    const handleSave = () => {
        let dados: IDespesaVO;
        dados = {
            id: Number(id),
            idUsuario: Number(localStorage.getItem('idUsuario')),
            idCategoria: Number(values.idCategoria),
            data: values.data,
            descricao: values.descricao,
            valor: values.valor,
            dataVencimento: values.dtVencimento
        };

        if (id === 0) {
            DespesasService
                .create(dados)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } 
                    else {
                        if (dados.id === 0 && result.message === true) {
                            alert('Despesa cadastrada com sucesso!');
                            handleClear();
                        }
                        else {
                            alert('Despesa atualizada com sucesso!');
                            navigate(`/lancamentos`);
                        }
                    }
                });
        } else {
            DespesasService
                .updateById(Number(id), dados)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        if (true) {
                            navigate('/despesas');
                        }
                    }
                });
        }
    }

    const handleEdit = (desp: IDespesaVO)  => {
        
        setValues({
            idUsuario: desp.idUsuario,
            idCategoria: desp.idCategoria.toString(),
            data: desp.data,
            descricao: desp.descricao,
            dtVencimento: desp.dataVencimento,
            valor: desp.valor       
        });

    }

    const handleClear = () => {
        setValues({
            ...values,
            idCategoria: '0',
            data: dayjs('2014-08-18T21:11:54'),
            descricao: '',
            dtVencimento: dayjs('2014-08-18T21:11:54'), 
            valor: 0                
        });
    }

    useEffect(() => {
        if (id !== 0) {
            DespesasService.getById(Number(id))
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
            titulo='Despesas'
            barraDeFerramentas={(
                <BarraFerramentas
                    isOpenTxtBusca={true}
                    btnVoltar onClickVoltar={() => navigate('/despesas/voltar')}
                    btnNovo onClickNovo={() => navigate('/despesas/0')} 
                    btnSalvar onClickSalvar={() => handleSave() }
                    />
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
                        <MenuItem value={1}>Alimentação</MenuItem>
                        <MenuItem value={2}>Casa</MenuItem>
                        <MenuItem value={3}>Serviços</MenuItem>
                        <MenuItem value={4}>Saúde</MenuItem>
                        <MenuItem value={5}>Imposto</MenuItem>
                        <MenuItem value={6}>Saúde</MenuItem>
                        <MenuItem value={7}>Transporte</MenuItem>
                        <MenuItem value={8}>Lazer</MenuItem>
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
                <FormControl size="small" fullWidth  >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} >
                            <DesktopDatePicker
                                label="Data de Vencimento"
                                inputFormat="DD/MM/YYYY"
                                value={values.dtVencimento}
                                onChange={handleChangeDataVencimento}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </FormControl>
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
