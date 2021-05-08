import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../Blog/Store/blogSlice';

export default configureStore({
  reducer: {
    blog: blogReducer,
  },
});
