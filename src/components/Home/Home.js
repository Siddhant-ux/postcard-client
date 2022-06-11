import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import Form from '../Form/Form';
import {Grow, Grid, Paper, AppBar, TextField, Button, Container } from "@material-ui/core";
import {useHistory, useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Posts from "../Posts/Posts";
import useStyles from './styles';
import { getPosts,getPostsBySearch} from "../../actions/posts";
import Pagination from "../Pagination";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostsBySearch({search, tags: tags.join(',')})); // the array of tags is converted into strings in which each element is seperated by ,
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history.push('/');
        }
    }


    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
    return (
        <Grow in>
                <Container maxWidth='xl'>
                <Grid container alignItems='stretch' justifyContent='space-between' className={classes.gridContainer} spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts currentId={currentId} setCurrentId={setCurrentId}></Posts>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                            name="search"
                            variant="outlined"
                            label="Search Posts"
                            fullWidth
                            value={search}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput 
                            style={{margin: "10px 0"}}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label='Search Tags'
                            variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color='primary' variant="contained">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                        {
                            (!searchQuery && !tags.length) &&
                            (
                                <Paper elevation={6} className={classes.pagination}>
                                    <Pagination page={page} />
                                </Paper>

                            )
                        }
                    </Grid>
                </Grid>
                </Container>
        </Grow>
    )
}

export default Home;