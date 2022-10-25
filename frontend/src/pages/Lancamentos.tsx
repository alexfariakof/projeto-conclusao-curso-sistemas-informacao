import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { LayoutMasterPage } from '../shared/layouts';
import { BarraFerramentas } from '../shared/components';
import { useEffect, useState } from 'react';
import { LancamentosService, ILancamentoVO, DespesasService, ReceitasService } from '../shared/services/api';
import { useDebounce } from '../shared/hooks';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom';


export const Lancamentos = () => {
    const navigate = useNavigate();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<(Omit<ILancamentoVO, 'id'>[])>([]);

    useEffect(() => {
        return (() => {
            debounce(() => {
                LancamentosService.getByMesAnoByIdUsuario('2022-10-07', Number(localStorage.getItem('idUsuario')))
                    .then((result) => {
                        if (result instanceof Error) {
                            alert(result.message);
                            return;
                        }
                        else {
                            setRows(result);
                        }
                    });
            });
        });
    }, [rows]);
    
    const handleDelete = (tipo: string, id: number) => {
        if(tipo === 'Despesas') {
            DespesasService
                .deleteById(id)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    }
                    else if (result === true) {                        
                        alert('Despesa exluída com sucesso!');                        
                    }
                });
        }
        else {
            ReceitasService
                .deleteById(id)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    }
                    else if (result === true){
                        navigate('/lancamentos');
                        alert('Receita exluídas com sucesso!');       
                    }
                });            
        }
    };

    const handleEdit = (tipo: string, id: number) => {
        if(tipo === 'Despesas') {
            navigate('/despesas/' + id) ;
        }
        else {
            navigate('/receitas/' + id) ;
        }
};

    return (
        <LayoutMasterPage titulo='Lançamentos'
            barraDeFerramentas={(
                <BarraFerramentas isOpenDataMesAno={true} btnNovo={false} btnSalvar={false} />
            )}
        >

            <Box
                gap={1}
                margin={1}
                padding={1}
                paddingX={2}
                height="100vh"
                display="flex"
                flexDirection="row"
                alignItems="start"
                component={Paper} 
                style={{overflow: 'auto'}}
                >
                <TableContainer component={Paper}  variant="outlined" sx={{ m: 1 }} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' >Ações</TableCell>
                                <TableCell>Usuário</TableCell>
                                <TableCell>IdDespesa</TableCell>
                                <TableCell>IdReceita</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Categoria</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell>                         
                                    <IconButton size="small" onClick={() => handleDelete('Receitas', 0)  } >
                                        <DeleteIcon />
                                    </IconButton >
                                    <IconButton size="small" onClick={() => handleEdit('Recaitas', 0)  } >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>Alex</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>18/08/2014</TableCell>
                                <TableCell>Receitas</TableCell>
                                <TableCell>R$ 12.250,00</TableCell>
                                <TableCell>Teste de grid  dinamica </TableCell>
                                <TableCell>Alimentação</TableCell>
                            </TableRow>

                            {
                                rows.map(row => (
                                    <TableRow key={Math.floor(Math.random() * 65536)}  >
                                        <TableCell align='center'>
                                            <IconButton onClick={() => handleDelete(row.tipo, row.idDespesa === 0 ?  row.idReceita : row.idDespesa) }>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleEdit(row.tipo, row.idDespesa === 0 ?  row.idReceita : row.idDespesa)  }>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{row.idUsuario}</TableCell>
                                        <TableCell>{row.idDespesa}</TableCell>
                                        <TableCell>{row.idReceita}</TableCell>
                                        <TableCell>{row.data}</TableCell>
                                        <TableCell>{row.tipo }</TableCell>                                        
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
