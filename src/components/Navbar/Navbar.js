import React, {useState, useEffect} from 'react';
import { AppBar, Typography, Toolbar, Avatar,  Button } from '@material-ui/core';
import useStyles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);


    const logout = () => {
        dispatch({type: 'LOGOUT'});

        history.push('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime())logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar position='static' color='inherit' className= {classes.appBar}>
            <div className={classes.brandContainer}>
            <Typography component={Link} to="/" variant='h2' align='center' className={classes.heading}>POSTCARD</Typography>
            <Link to="/">
            <img src={memories} component={Link} to="/" alt='memories' height='60' className={classes.image}></img>
            </Link>
            </div>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography variant='h6' className={classes.userName}>{user.result.name}</Typography>
                        <Button variant='contained' color='secondary' className={classes.logout} onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;