import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice'
import { apiSlice } from "./features/api/apiSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware)
})