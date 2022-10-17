import { Button, Card, CardActions, CardContent, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuthContext } from "../../contexts";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

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

    if (isAuthenticated) {
        return (<>{children}</>);
    }
    else {
        return (
            <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center' >
                <Card>
                    <CardContent>
                        <Box display='flex' flexDirection='column' gap={2} width={250}   >
                            <Typography variant="h6" align="center">Identifique-se</Typography>
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
                                <Box display='flex' flexDirection='row' gap={2} width='100%'>
                                    <Link  href='/esqueci-senha' >Esqueci minha senha</Link>
                                    <Link href='/primeiro-acesso' >Primeiro Acesso </Link>
                                </Box>

                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box width='100%' display='flex' justifyContent='center' >
                            <Button variant="contained" onClick={() => login(values.email, values.password)}>
                                Entrar
                            </Button>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        );
    }
}