import React, {useState, useEffect} from 'react';
import { Avatar, Container, Paper, Button, Grid, Typography, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './icon'; 
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signup, signin} from '../../actions/auth';
import {gapi} from 'gapi-script'

const initialState = {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword); // when changing state using previous state use a callback
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history));
        }else{
            dispatch(signin(formData, history));
        }
        console.log(formData);
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSuccess = async (res) => {
        const result = res?.profileObj; //optional chaining operator insteal of throwing error if res object/ profile is not there it will simply make the result undefined
        const token = res?.tokenId;
        try{
            dispatch({type: "AUTH", data: {result, token}});
            history.push('/');
        }catch(err){
            console.log(err);
        }
        console.log(res);
    }

    const onFailure = (err) => {
        console.log(err)
        console.log('Google Login Failed');
    }

    useEffect(() => {
        function start(){
        gapi.auth2.init({
            client_id: "1034980307254-n13j9khligsrggm7e5bj4aebmt9fpr47.apps.googleusercontent.com",
            scope: ""
        })
    };
    gapi.load('client:auth2', start);
    });

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant='h5'>{isSignup ? 'Sign Up': 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup &&
                            (<>
                               <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                               <Input name='lastName' label='Last Name' handleChange={handleChange} autoFocus half />
                            </>)
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type="email" />
                        <Input name='password' label='Password' handleChange={handleChange} type= {showPassword ? 'text': 'password'} handleShowPassword={handleShowPassword}/>
                        {
                            isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>
                        }
                    </Grid>
                    <Button type='submit' color='primary' className={classes.submit} fullWidth variant='contained'>
                        {
                            isSignup ? 'Sign Up': 'Sign In'
                        }
                    </Button>
                    {/* The key point is that Google needs to identify the application, and authenticate that something claiming to be the application is genuine. ClientID is the identifier */}
                    <GoogleLogin
            clientId="1034980307254-n13j9khligsrggm7e5bj4aebmt9fpr47.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy="single_host_origin"
          />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account ? Sign In': "Don't have an account ? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;