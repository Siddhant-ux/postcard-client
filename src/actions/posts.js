import * as api from '../api/index';
import { CREATE, DELETE, UPDATE, FETCH_ALL, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT } from '../constants/actionTypes';


//because we are dealing with asyn data, payload is basically all the posts so it will take some time so using redux thunk we return a funtion so we can use async await capabilities, we get access to dispatch as a property 
//action creator 


export const getPost = (id) => async (dispatch) => {

    try{
        dispatch({type: START_LOADING});
        const {data, } = await api.fetchPost(id);
        dispatch({type: END_LOADING});
        dispatch({
            type: FETCH_POST,
            payload: data
        });

    }catch(err){
        console.log(err.message);
    }
    // const action = {
    //     type: 'FETCH_ALL',
    //     payload: []
    // }
    // return action;
}


export const getPosts = (page) => async (dispatch) => {

    try{
        dispatch({type: START_LOADING});
        const {data, } = await api.fetchPosts(page);
        dispatch({type: END_LOADING});
        dispatch({
            type: FETCH_ALL,
            payload: data
        });

    }catch(err){
        console.log(err.message);
    }
    // const action = {
    //     type: 'FETCH_ALL',
    //     payload: []
    // }
    // return action;
}



export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery); // two times destructured
        dispatch({type: END_LOADING});
        dispatch({
            type: FETCH_BY_SEARCH,
            payload: data
        });
        console.log(data);
    }catch(err){
        console.log(err);
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try{
        const {data} = await api.createPost(post);
        dispatch({
            type: CREATE,
            payload: data
        });
        history.push(`/posts/${data._id}`)
    }catch(err){
        console.log(err);
    }
} 

export const updatePost = (id, post) => async (dispatch) => {
    try{
        const {data} = await api.updatePost(id, post);
        dispatch({
            type: UPDATE,
            payload: data
        })
    }catch(err){
        console.log(err);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);
        dispatch({
            type: DELETE,
            payload: id
        })
    }catch(err){
        console.log(err);
    }
}

export const likePost = (id) => async (dispatc) => {
    try{
        const {data} = await api.likePost(id);
        dispatc({
            type: LIKE,
            payload: data
        })
    }catch(err){
        console.log(err);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try{
        const {data} = await api.comment(value, id);
    dispatch({
        type: COMMENT,
        payload: data
    });
        return data.comments;
    }catch(err){
        console.log(err);
    }
}