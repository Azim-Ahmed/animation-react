import {
    Button,
    Card,
    Container,
    Grid,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Box,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import { images } from '../../assets';
import { Link, Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions';
/**
 *@function Login.jsx
 *@author Azim
 *
 **/
const Login = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    //RHF
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        dispatch(login(data))
    }
    const auth = useSelector(state => state.auth)
    console.log(auth);

    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    if (auth.authenticate) {
        return <Redirect to="/home" />;
    }
    return (
        <Container className={classes.loginContainer}>
            <Card className={classes.loginCard} elevation={4}>
                <Grid container spacing={4}>
                    <Grid
                        item
                        md={6}
                        lg={6}
                        sm={12}
                        xs={12}
                        style={{
                            background: '#556cd6',
                            color: 'white',
                        }}
                    >
                        <Grid container justify='center' alignItems='center'>
                            <div style={{ margin: '30px' }}>
                                <Typography
                                    style={{ fontWeight: '500' }}
                                    align='center'
                                    variant='h4'
                                >
                                    Team doesn't lose track
                                </Typography>
                                <Typography align='center'>
                                    Work on big ideas, without the busywork
                                </Typography>
                            </div>
                            <img
                                style={{ textAlign: 'center' }}
                                src={images.login}
                                alt='login'
                            />
                        </Grid>
                    </Grid>
                    <Grid className={classes.loginFormStyle} item md={6}>
                        <Typography
                            color='primary'
                            variant='h4'
                            className={classes.squareText}
                        >
                            SQUARE{' '}
                        </Typography>
                        <Typography className={classes.BearText} variant='h4'>
                            BEAR{' '}
                        </Typography>
                        <Typography
                            className={classes.welcomeMessage}
                            variant='h3'
                            component='p'
                        >
                            Welcome Back
                        </Typography>
                        <Typography className={classes.spanTaginLogin} variant='body2'>
                            Enter credential to access Account{' '}
                        </Typography>
                        <form
                            className={classes.root}
                            noValidate
                            autoComplete='off'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name='username'
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: 'Entered value does not match email format',
                                    },
                                }}
                                defaultValue=''
                                render={({ field }) => (
                                    <CssTextField
                                        {...field}
                                        label='Email'
                                        variant='outlined'
                                        fullWidth
                                        type='email'
                                    />
                                )}
                            />
                            {errors.username && (
                                <Typography color='primary'>{errors.username.message}</Typography>
                            )}
                            {errors.username?.type === 'required' && (
                                <Typography color='primary'>{`Enter your valid mail`}</Typography>
                            )}

                            <Controller
                                name='password'
                                control={control}
                                defaultValue=''
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <CssTextField
                                        variant='outlined'
                                        {...field}
                                        fullWidth
                                        label='Password'
                                        type={values.showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={handleClickShowPassword}>
                                                        {values.showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            {errors.password?.type === 'required' && (
                                <Typography color='primary'>Password is required</Typography>
                            )}
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    type='submit'
                                    size='large'
                                    variant='contained'
                                    color='primary'
                                    style={{ display: 'inline-block' }}
                                >
                                    LOGIN
                                </Button>
                                <Typography variant='body2' color='primary' component='span'>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to='/forgot-password'
                                    >
                                        <Typography
                                            variant='body2'
                                            color='primary'
                                            component='span'
                                        >
                                            {' '}
                                            &nbsp; FORGOT PASSWORD
                                        </Typography>{' '}
                                    </Link>
                                </Typography>
                            </Box>
                        </form>

                        <Typography style={{ color: '#ffe' }}>
                            I am a new user{' '}
                            <Link style={{ textDecoration: 'none' }} to='/signup'>
                                <Typography variant='body2' color='primary' component='span'>
                                    SIGNUP
                                </Typography>{' '}
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default Login;

//Material Ui css

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-input': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiFormLabel-root': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '90%',
            '.MuiTextField-root': {
                color: 'white',
            },
            '& .MuiSvgIcon-root': {
                color: 'white',
            },
            '& .MuiOutlinedInput-input': {
                color: 'white',
            },
        },
    },
    loginContainer: {
        marginTop: '80px',
    },
    loginCard: {
        minHeight: '600px',
    },
    loginFormStyle: {
        paddingTop: '15px',
        background: '#191c31',
    },
    spanTaginLogin: {
        margin: '20px 0px',
        color: theme.palette.common.white,
    },
    squareText: {
        letterSpacing: 3,
        fontWeight: 800,
        textShadow: '1px 1px black',
    },
    BearText: {
        letterSpacing: 3,
        fontWeight: 800,
        color: theme.palette.common.white,
        textShadow: '1px 1px black',
    },
    welcomeMessage: {
        color: theme.palette.common.white,
        fontWeight: 300,
    },
    ForgotAndLogin: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    forgotPassword: {
        alignSelf: 'center',
        textAlign: 'end',
    },
}));
