import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import blogService from './blogService'

export function getDataAuthor({ id }) {
    return (dispatch) =>
        trackPromise(
            blogService.getDataAuthor({ id })
                .then((response) => {
                    const { data } = response;
                    dispatch(setUserData(data))
                    return data
                }).catch(error => {
                    dispatch(setUserData([]))
                })
        )
}

export function getDataAuthorDetails({ id, view, order }) {
    return (dispatch) =>
        trackPromise(
            blogService.getDataAuthorDetails({ id, view, order })
                .then((response) => {
                    const { data } = response;
                    dispatch(setAuthorDetails(data))
                    return data
                }).catch(error => {
                    dispatch(setAuthorDetails([]))
                })
        )
}

export function getDataPostDetails({ id }) {
    return (dispatch) =>
        trackPromise(
            blogService.getDataPostDetails({ id })
                .then((response) => {
                    const { data } = response;
                    dispatch(setPostDetails(data))
                    return data
                }).catch(error => {
                    dispatch(setPostDetails([]))
                })
        )
}

export function getComments({id}) {
    return (dispatch) =>
        trackPromise(
            blogService.getComments({id})
                .then((response) => {
                    const { data } = response;
                    dispatch(setCommentsData(data))
                    return data
                }).catch(error => {
                    dispatch(setCommentsData([]))
                })
        )
}

export function getLikes({id}) {
    return (dispatch) =>
        trackPromise(
            blogService.getLikes({id})
                .then((response) => {
                    const { data } = response;
                    dispatch(setLikesData(data))
                    return data
                }).catch(error => {
                    dispatch(setLikesData([]))
                })
        )
}


export const slice = createSlice({
    name: 'blogPost',
    initialState: {
        userData: [],
        commentData : [],
        authorDetailsData :[],
        postDetailsData:[],
        likeData:[],
        fetchStatus:false,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.fetchStatus = false;
        },
        setAuthorDetails: (state, action) => {
            state.authorDetailsData = action.payload;
            state.fetchStatus = true;
        },
        setPostDetails: (state, action) => {
            state.postDetailsData = action.payload;
        },
        setCommentsData: (state, action) => {
            state.commentData = action.payload;
        },
        setLikesData: (state, action) => {
            state.likeData = action.payload;
        }
    },
    extraReducers: {}
});

export const { setResetAuthorDetails, setLikesData, setPostDetails, setUserData, setAuthorDetails, setCommentsData } = slice.actions;

export default slice.reducer;
