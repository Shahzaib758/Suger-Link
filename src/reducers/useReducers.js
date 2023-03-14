import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { GET } from '../utilities/ApiProvider'
import Cookies from 'js-cookie'

// Basic Global State
const initialState = {};

// State Updating Functions
const userReducer = createSlice({
    name:'person',
    initialState,
    reducers:{
        updateUser: (state, action)=>{
            console.log(action.payload);
            state.value = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
            console.log('all ran good');
            // Cookies.set('user', JSON.stringify(action.payload))
        },
        loadUser: (state, action) => {
            state.value = action.payload;
        },
        // loadLocalStorage: (state, action) => {
        //     state.value = action.payload;
        //     localStorage.setItem('user', JSON.stringify(action.payload))
        // },
        // loadCookies: (state, action) => {
        //     state.value = action.payload;
        //     Cookies.set('user', JSON.stringify(action.payload))
        // },
        logout: (state, action) => {
            localStorage.clear();
            Cookies.remove('user');
            state.value = null;
        }
    }
})

// Exporting All the State Updating Functions
export const { updateName, loadUser, loadLocalStorage, loadCookies, logout } = userReducer.actions
export default userReducer.reducer
