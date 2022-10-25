import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, IconButton } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BarraFerramentas } from '../shared/components';
import { LayoutMasterPage } from "../shared/layouts";
import { CategoriasService, ICategoriaVO } from '../shared/services/api';
import { Delete, Edit } from '@mui/icons-material';

interface State {
    idCategoria: number;
    idTipoCategoria: number;
    descricao: string;
    idUsuario: Number;
}

export const Categorias: React.FC = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<ICategoriaVO[]>([]);
    const { idCategoria = 0 } = useParams<'idCategoria'>();
    const [values, setValues] = useState<State>({
        idCategoria: 0,
        idTipoCategoria: 0,
        descricao: '',
        idUsuario: 0
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChangeTipoCategoria = (event: SelectChangeEvent) => {
        setValues({ ...values, idTipoCategoria: Number(event.target.value) });
    };


    const handleSave = () => {
    }

    const handleEdit = (id: number) => { };

    const handleDelete = (id: number) => { };

    const handleClear = () => {
        setValues({
            ...values,
            idCategoria: 0,
            descricao: '',

        });
    }

    useEffect(() => {
        if (idCategoria !== 0) {
            CategoriasService.getById(Number(idCategoria))
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    }
                    else {
                        console.log(result.id);
                    }
                });
        }
    }, [idCategoria])

    return (

        <LayoutMasterPage
            titulo='Categorias'
            barraDeFerramentas={(
                <BarraFerramentas
                    isOpenTxtBusca={true}
                    btnVoltar onClickVoltar={() => navigate('/Categorias')}
                    btnNovo onClickNovo={() => navigate('/Categorias')} />
            )}
        >
            <Box
                gap={1}
                margin={1}
                padding={1}
                paddingX={2}
                height="auto"
                display="flex"
                flexDirection="column"
                alignItems="start"
                component={Paper} >
                <FormControl size="small" fullWidth  >
                    <InputLabel id="txtTipoCategoria">Tipo de Categoria</InputLabel>
                    <Select
                        labelId="txtTipoCategoria"
                        id="txtTipoCategoria"
                        value={values.idTipoCategoria.toString()}
                        label="Tipo de Categoria"
                        onChange={handleChangeTipoCategoria}
                        defaultValue='0'
                    >
                        <MenuItem value={0} >Todas</MenuItem>
                        <MenuItem value={1}>Despesas</MenuItem>
                        <MenuItem value={2}>Receitas</MenuItem>
                    </Select>
                </FormControl>
                <TextField size="small" label="Descrição" inputProps={{ maxLength: 50 }} fullWidth
                    value={values.descricao}
                    onChange={handleChange('descricao')}
                />
            </Box>
            <Box
                gap={1}
                margin={1}
                padding={1}
                paddingX={2}
                width='96%'
                height="100%"
                display="flex"
                flexDirection="row"
                alignItems="start"
                component={Paper}
                style={{ overflow: 'auto' }}
            >
                <TableContainer component={Paper} variant="outlined" sx={{ m: 1 }} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' >Ações</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Descrição</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(0)} >
                                        <Delete />
                                    </IconButton >
                                    <IconButton size="small" onClick={() => handleEdit(0)} >
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>Despesas</TableCell>
                                <TableCell>Alimentação</TableCell>
                            </TableRow >
                            <TableRow>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(0)} >
                                        <Delete />
                                    </IconButton >
                                    <IconButton size="small" onClick={() => handleEdit(0)} >
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>Receitas</TableCell>
                                <TableCell>Salário</TableCell>
                            </TableRow>

                            {
                                rows.map(row => (
                                    <TableRow key={row.id}  >
                                        <TableCell align='center'>
                                            <IconButton onClick={() => handleDelete(row.id)}>
                                                <Delete />
                                            </IconButton>
                                            <IconButton onClick={() => handleEdit(row.id)}>
                                                <Edit />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.idTipoCategoria === 1 ? 'Despesas' : 'Receitas'}</TableCell>
                                        <TableCell>{row.descricao}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>

                    </Table>
                </TableContainer>
            </Box>
        </LayoutMasterPage>
    );
}
