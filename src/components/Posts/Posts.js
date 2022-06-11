import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress} from '@material-ui/core';
import Post from './Post/Post'
import useStyles from './styles';

const Posts = ({setCurrentId, currentId}) => {
    const classes = useStyles();
    const {posts, isLoading} = useSelector((state) => state.posts); // we get access to the global state store and as we named this state posts(combineReducers) so now we have all the posts {posts, currentPage, noOfPages}
    console.log(posts);
    if(!posts.length && !isLoading) return 'No Posts';
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {
                    posts.map((post) => (
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} setCurrentId={setCurrentId} currentId={currentId}></Post>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;