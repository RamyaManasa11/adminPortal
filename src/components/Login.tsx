import React, { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { LockOutlined } from "@material-ui/icons";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Paper, Avatar, TextField, FormControlLabel, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {

    const history = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("UserName")) history('/')
    }, [])

    const validate = (event: React.FormEvent<HTMLFormElement>) => {
        let result = true;
        const data = new FormData(event.currentTarget);
        let email = data.get('email');
        let password = data.get('password');
        if (email === '' || email === null) {
            result = false;
            toast.warning('please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('please Enter Password');
        }
        return result;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate(event)) {
            const data = new FormData(event.currentTarget);
            let email = data.get('email');
            let password = data.get('password');
            if ((email !== 'admin1@gmail.com' || password !== 'Password@1') && (email !== 'admin2@gmail.com' || password !== 'Password@2'))
                toast.error('please Enter valid credentials');;
            if (email === 'admin1@gmail.com' || password === 'Password@1') {
                history('/');
                toast.success("login success");
                localStorage.setItem("UserName", 'admin1@gmail.com')
            }
            if (email === 'admin2@gmail.com' || password === 'Password@2') {
                history('/');
                localStorage.setItem("UserName", 'admin2@gmail.com')
            }
        }
    };

    const avatarStyle = { backgroundColor: '#22d5af' }
    const paperStyle = {
        borderRadius: '20px',
        padding: '20px',
        height: '80vh',
        width: '400px',
        margin: '30px auto',
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main">
                <Paper elevation={10} style={paperStyle}>
                    <Box
                        sx={{
                            my: 6,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar style={avatarStyle}><LockOutlined /></Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                placeholder='Enter EmailAddress'
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                placeholder='Enter Password'
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </ThemeProvider>
    );
}