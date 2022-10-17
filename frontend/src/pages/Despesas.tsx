import { Form } from '@unform/web';
import { VTextField } from '../shared/forms/VTextField';
import { useEffect, useState } from 'react';
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
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { DespesasService } from '../shared/services/api';
import { VForm } from '../shared/forms';
import { useVForm } from '../shared/forms';

interface IFormData {
    idUsuario: Number;
    idCategoria: Number;
    data: string;
    descricao: string;
    valor: Number;
    dataVencimento: string;
}

interface State {
    amount: string;
    descricao: string;
    data: string;
    dtVencimento: string;
    idCategoria: string;



}
export const Despesas: React.FC = () => {
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
    const navigate = useNavigate();
    const { id = 0 } = useParams<'id'>();


    const [values, setValues] = useState<State>({
        amount: '',
        descricao: '',
        idCategoria: '',
        data: '',
        dtVencimento: ''


    });

    const [categoria, setCategoria] = useState('');

    const [valueData, setValueData] = useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );

    const [valueDataVencimento, setvalueDataVencimento] = useState<Dayjs | null>(
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

    const handleChangeDataVencimento = (newValue: Dayjs | null) => {
        setvalueDataVencimento(newValue);
    };

    const handleSave = (dados: IFormData) => {
        if (id === 0) {
            DespesasService
                .create(dados)
                .then((result) => {

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        if (isSaveAndClose()) {
                            navigate('/pessoas');
                        } else {
                            navigate(`/pessoas/detalhe/${result}`);
                        }
                    }
                });
        } else {
            DespesasService
                .updateById(Number(id), { id: Number(id), ...dados })
                .then((result) => {

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        if (isSaveAndClose()) {
                            navigate('/despesas');
                        }
                    }
                });
        }
    }

        useEffect(() => {
            if (id !== 0) {
                DespesasService.getById(Number(id))
                    .then((result) => {

                        if (result instanceof Error) {
                            alert(result.message);
                            navigate('/despesas');
                        }
                        else {

                            console.log(result.id);
                        }
                    });
            }
            else {

            }

        }, [id])

        return (

            <LayoutMasterPage
                titulo='Despesas'
                barraDeFerramentas={(
                    <BarraFerramentas
                        btnVoltar onClickVoltar={() => navigate('/despesas/voltar')}
                        btnNovo onClickNovo={() => navigate('/despesas/0')} />
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
                    <VForm ref={formRef} onSubmit={handleSave}>
                        {id}
                        <FormControl size="small" fullWidth  >
                            <InputLabel id="txtCategoria">Categoria</InputLabel>
                            <Select
                                labelId="txtCategoria"
                                id="txtCategoria"
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
                        <TextField size="small" label="Descrição" inputProps={{ maxLength: 50 }} fullWidth
                            value={values.descricao}
                            onChange={handleChange('descricao')}

                        />
                        <FormControl size="small" fullWidth  >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Data de Vencimento"
                                        inputFormat="MM/DD/YYYY"
                                        value={valueDataVencimento}
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
                            type='submit'
                        >Salvar</Button>
                        <VTextField
                            size="small"
                            inputProps={{ maxLength: 50 }}
                            fullWidth
                            name='descricao'
                            label='Descrição'
                            onChange={handleChange('descricao')}

                        >
                        </VTextField>
                        <VTextField
                            size="small"
                            type="number"
                            fullWidth
                            name='dataVencimento'
                            label='Data de Vencimento'
                        >
                        </VTextField>
                        <VTextField
                            size="small"
                            type="number"
                            fullWidth
                            name='valor'
                            label='Valor'
                            onChange={handleChange('amount')}

                        >
                        </VTextField>

                    </VForm>
                </Box>
            </LayoutMasterPage>
        );
    }
