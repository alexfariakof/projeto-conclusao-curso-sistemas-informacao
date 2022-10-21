import { Button, Card, CardActions, CardContent, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography, Avatar, Checkbox, Paper } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box } from "@mui/system";
import { FormControlLabel } from '@mui/material'
import { useAuthContext } from "../../contexts";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';

interface ILoginProps {
    children: React.ReactNode;
}

interface State {
    email: string;
    password: string;
    showPassword: boolean;
}


export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext();

    const [values, setValues] = useState<State>({
        email: '',
        password: '',
        showPassword: false,
    });

    const [valuesCPassword, setValuesCpassword] = useState<State>({
        email: '',
        password: '',
        showPassword: false,
    });



    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChangeCPassword =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValuesCpassword({ ...valuesCPassword, [prop]: event.target.value });
        };

    const handleClickShowCPassword = () => {
        setValuesCpassword({
            ...valuesCPassword,
            showPassword: !valuesCPassword.showPassword,
        });
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handlePAClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handlePAClickShowCPassword = () => {
        setValuesCpassword({
            ...valuesCPassword,
            showPassword: !valuesCPassword.showPassword,
        });
    };

    const handleMouseDownCPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleSubmit = () => {
        login(values.email, values.password);
    }

    const [openPrimeiroAcesso, setPrimeiroAcessoOpen] = useState(false);
    const [openEsqueciSenha, setEsqueciSenhaOpen] = useState(false);
    const handlePrimeiroAcessoOpen = () => { setPrimeiroAcessoOpen(true); };
    const handlePrimeiroAcessoClose = () => setPrimeiroAcessoOpen(false);
    const handleEsqueciSenhaOpen = () => { setEsqueciSenhaOpen(true); };
    const handleEsqueciSenhaClose = () => setEsqueciSenhaOpen(false);

    const avatarStyle = { backgroundColor: '#1bbd7e' }


    if (isAuthenticated) {
        return (<>{children}</>);
    }
    else {
        return (
            <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center' >
                <Card>
                    <CardContent>
                        <Box display='flex' flexDirection='column' gap={2} width={250}   >
                            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                                <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                                <Typography variant="h4" align="center">Identifique-se</Typography>
                            </Box>

                            <TextField size="small" label='Email' inputProps={{ maxLength: 50, type: 'email' }} fullWidth
                                value={values.email}
                                onChange={handleChange('email')}
                            />
                            <FormControl size="small" fullWidth variant="outlined" >
                                <InputLabel htmlFor="txtPassword">Senha</InputLabel>
                                <OutlinedInput
                                    id="txtPassword"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    onKeyUp={handleKeyPress}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Senha"
                                    inputProps={{ maxLength: 50 }}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Lembre-me"
                            />
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box width='100%' display='flex' flexDirection='column' gap={2} justifyContent='center' >
                            <Button variant="contained" onClick={() => handleSubmit()}>
                                Entrar
                            </Button>
                            <Typography >
                                <Link href='#' onClick={() => handleEsqueciSenhaOpen()} >Esqueci minha senha</Link>
                            </Typography >
                            <Typography>
                                <Link href='#' onClick={() => handlePrimeiroAcessoOpen()}  >Primeiro Acesso </Link>
                            </Typography>
                        </Box>
                    </CardActions>
                </Card>
                <Modal
                    open={openEsqueciSenha}
                    onClose={handleEsqueciSenhaClose}
                    aria-labelledby="modal-esqueci-minha-senha"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        gap={1}
                        margin={2}
                        padding={1}
                        paddingX={2}
                        width="50vw"
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        component={Paper} >
                        <Typography id="mmodal-esqueci-minha-senha" variant="h6" component="h2">
                            Esqueci minha senha
                        </Typography>
                        <Typography id="modal-modal-description" gap={2}>
                            Prezado(a) ,
                            Enviamos um e-mail com instruções de redefinição da sua senha para o email {values.email}.
                            Se não encontrá-lo na caixa de entrada, verifique a lixeira ou a caixa de spam.
                            Se não possui mais acesso a esse endereço de e-mail , entre em contato conosco.
                        </Typography>
                        <Box width='100%' display='flex' flexDirection='column' gap={2} justifyContent='center' marginTop={2} >
                            <Button variant="contained" onClick={() => handleEsqueciSenhaClose()}>OK</Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={openPrimeiroAcesso}
                    onClose={handlePrimeiroAcessoClose}
                    aria-labelledby="modal-primeiro-acesso"
                    aria-describedby="modal-modal-description"                    
                >
                    <Box
                        gap={1}
                        margin={2}
                        padding={1}
                        paddingX={2}
                        width="80vw"
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        component={Paper} >

                        <TextField size="small" label="Nome" inputProps={{ maxLength: 50 }} fullWidth />
                        <TextField size="small" label='Telefone' inputProps={{ maxLength: 15, type: 'tel' }} fullWidth />
                        <TextField size="small" label='Email' inputProps={{ maxLength: 50, type: 'email' }} fullWidth />
                        <FormControl size="small" fullWidth variant="outlined" >
                            <InputLabel htmlFor="txtPassword">Senha</InputLabel>
                            <OutlinedInput
                                id="txtPassword"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                                type={valuesCPassword.showPassword ? 'text' : 'password'}
                                value={valuesCPassword.password}
                                onChange={handleChangeCPassword('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowCPassword}
                                            onMouseDown={handleMouseDownCPassword}
                                            edge="end"
                                        >
                                            {valuesCPassword.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirma Senha"
                                inputProps={{ maxLength: 50 }}
                            />
                        </FormControl>
                        <Button color='primary' disableElevation variant='contained' startIcon={<SaveIcon />} >Salvar</Button>
                    </Box>
                </Modal>
            </Box>
        );
    }
}