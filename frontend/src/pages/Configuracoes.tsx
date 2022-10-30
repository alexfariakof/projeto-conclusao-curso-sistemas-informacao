import { useState, MouseEvent } from 'react';
import { useAppThemeContext } from "../shared/contexts";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography, Paper, ToggleButtonGroup, ToggleButton, useTheme, Avatar } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SaveIcon from '@mui/icons-material/Save';
import { LayoutMasterPage } from '../shared/layouts';
import { BarraFerramentas } from '../shared/components';


interface ITrocaSenha {
    password: string
    showPassword: boolean;
    cPassword: string;
    showCPassword: boolean;
}

export const Configuracoes = () => {
    const theme = useTheme();
    const { toggleTheme } = useAppThemeContext();
    const [alignment, setAlignment] = useState('web');
    const [valuesTC, setValuesTC] = useState<ITrocaSenha>({
        password: '',
        showPassword: false,
        cPassword: '',
        showCPassword: false

    });

    const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string,) => {
        setAlignment(newAlignment);
        toggleTheme();
    }
    const handleChangeTC = (prop: keyof ITrocaSenha) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValuesTC({ ...valuesTC, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValuesTC({
            ...valuesTC,
            showPassword: !valuesTC.showPassword,
        });
    };

    const handleClickShowTCCPassword = () => {
        setValuesTC({
            ...valuesTC,
            showCPassword: !valuesTC.showCPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChangePassword = () => {
        alert('Implementar troca de senha!');
    }

    return (
        <LayoutMasterPage
            titulo='Configurações'            
        >
            <Box height="100%" width='100%' display="flex" margin={0} flexDirection="column" bgcolor='#00F12F' >
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
                    <Typography variant='h6'>
                        Tema
                    </Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="light">Claro</ToggleButton>
                        <ToggleButton value="dark">Escuro</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
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
                    <Typography variant='h6'>
                        Trocar Senha
                    </Typography>
                    <FormControl size="small" fullWidth variant="outlined" >
                        <InputLabel htmlFor="txtTCPassword">Senha</InputLabel>
                        <OutlinedInput
                            id="txtTCPassword"
                            type={valuesTC.showPassword ? 'text' : 'password'}
                            value={valuesTC.password}
                            onChange={handleChangeTC('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {valuesTC.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Senha"
                            inputProps={{ maxLength: 50 }}
                        />
                    </FormControl>
                    <FormControl size="small" fullWidth variant="outlined" >
                        <InputLabel htmlFor="txtConfirmPassword">Confirma Senha</InputLabel>
                        <OutlinedInput
                            id="txtConfirmPassword"
                            type={valuesTC.showCPassword ? 'text' : 'password'}
                            value={valuesTC.cPassword}
                            onChange={handleChangeTC('cPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowTCCPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end" >
                                        {valuesTC.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirma Senha"
                            inputProps={{ maxLength: 50 }}
                        />
                    </FormControl>
                    <Button color='primary' disableElevation variant='contained' startIcon={<SaveIcon />} onClick={handleChangePassword} >Salvar</Button>
                </Box>
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
                    <Typography variant='h6'>
                        Trocar Imagem de Perfil
                    </Typography>
                    <Box flexDirection="row">
                        <InputLabel htmlFor="upload-photo">
                            <Avatar
                                alt="Alex Ribeiro"
                                sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                                src="/static/images/avatar/1.jpg" />
                        </InputLabel>
                        <input
                            style={{ display: 'none' }}
                            id='upload-photo'
                            name='upload-photo'
                            type='file'
                        />
                        <br />
                        <Button color='primary' disableElevation variant='contained' startIcon={<SaveIcon />} onClick={handleChangePassword} >Salvar</Button>                </Box>
                </Box>
            </Box>
        </LayoutMasterPage>
    );
}