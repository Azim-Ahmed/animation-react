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
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/actions';

const Signup = (props) => {
    const classes = useStyles();
    const [userCreated, setUserCreated] = useState(false)
    //RHF
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        let newData = data;
        newData.roleType = 'USER';
        newData.admin = false;
        await dispatch(signup(newData));
        reset()
        await setUserCreated(true)
        console.log(newData);

    };
    const [values, setValues] = useState({
        showPassword: false,
    });

    const user = useSelector((state) => state.user);
    console.log(user.message);
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

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
                            variant='h4'
                            component='h3'
                        >
                            Create A New Account
                        </Typography>
                        {
                            userCreated ? <Typography style={{ color: "green", background: "white", padding: "10px" }} className={classes.spanTaginLogin} variant='body2'>
                                User Created SuccessFully,Please login
                            </Typography> : <Typography className={classes.spanTaginLogin} variant='body2'>
                                Enter credential to access Account{' '}
                            </Typography>
                        }


                        {/* hoook form section */}

                        <form
                            className={classes.root}
                            noValidate
                            autoComplete='off'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name='username'
                                control={control}
                                defaultValue=''
                                rules={{ required: true, maxLength: 20 }}
                                render={({ field }) => (
                                    <CssTextField
                                        {...field}
                                        label='Username'
                                        variant='outlined'
                                        fullWidth
                                        type='text'
                                    />
                                )}
                            />
                            {errors.username?.type === 'required' && (
                                <Typography color='primary'>user name is required</Typography>
                            )}
                            <Controller
                                name='email'
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
                            {errors.email && (
                                <Typography color='primary'>{errors.email.message}</Typography>
                            )}
                            {errors.email?.type === 'required' && (
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
                                    REGISTER
                                </Button>
                                <Typography
                                    variant='body2'
                                    style={{
                                        color: 'white',
                                    }}
                                    component='span'
                                >
                                    ALready user?
                                    <Link style={{ textDecoration: 'none' }} to='/'>
                                        <Typography
                                            variant='body2'
                                            color='primary'
                                            component='span'
                                        >
                                            {' '}
                                            &nbsp; LOGIN
                                        </Typography>{' '}
                                    </Link>
                                </Typography>
                            </Box>
                        </form>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default Signup;

//material Ui styles

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-input': {
            color: 'white',
        },
        '& .MuiSvgIcon-root': {
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
        position: 'relative',
        // margin: '0px 50px 0px 0px',
    },
}));
