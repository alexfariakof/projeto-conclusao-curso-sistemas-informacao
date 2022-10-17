import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { LayoutMasterPage } from '../shared/layouts';
import { BarraFerramentas } from '../shared/components';
import { useEffect, useState } from 'react';
import { LancamentosService, ILancamentoVO } from '../shared/services/api';
import { useDebounce } from '../shared/hooks';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom';


export const Lancamentos = () => {
    const navigate = useNavigate();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<ILancamentoVO[]>([]);

    useEffect(() => {
        debounce(() => {
            LancamentosService.getByMesAnoByIdUsuario('2022-10-07', 1)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    else {
                       setRows(result);
                    }
                    console.log(result);
                });
        });
    }, []);

    const handleDelete = (id: number) => {
            alert('handle Botão Delete funcionando')   ;       

    };

    const handleEdit = (id: number) => {
         navigate('/despesas/' + id) ;

};

    return (
        <LayoutMasterPage titulo='Lançamentos'
            barraDeFerramentas={(
                <BarraFerramentas btnNovo={false} />
            )}
        >

            <Box
                gap={1}
                margin={2}
                padding={1}
                paddingX={2}
                height="100%"
                display="flex"
                flexDirection="row"
                alignItems="start"
                component={Paper} >
                <TableContainer component={Paper} variant="outlined" sx={{ m: 1 }} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' >Ações</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Usuário</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Tipo de Lançamento</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Categoria</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell>                         
                                    <IconButton size="small" onClick={() => handleDelete(1)  } >
                                        <DeleteIcon />
                                    </IconButton >
                                    <IconButton size="small" onClick={() => handleEdit(1)  } >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>Alex</TableCell>
                                <TableCell>18/08/2014</TableCell>
                                <TableCell>Receitas</TableCell>
                                <TableCell>R$ 12.250,00</TableCell>
                                <TableCell>Teste de grid  dinamica </TableCell>
                                <TableCell>Alimentação</TableCell>
                            </TableRow>

                            {
                                rows.map(row => (
                                    <TableRow key={row.id}  >
                                        <TableCell align='center'>
                                            <IconButton onClick={() => handleDelete(row.id) }>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleEdit(row.id)  }>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.idUsuario}</TableCell>
                                        <TableCell>{row.data}</TableCell>
                                        <TableCell>{row.idDespesa}</TableCell>                                        
                                        <TableCell>R$ {row.valor}</TableCell>
                                        <TableCell>{row.descricao}</TableCell>
                                        <TableCell>{row.categoria}</TableCell>
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
