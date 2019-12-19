import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer';
import { contohReducer } from './contohReducer';

export default combineReducers({
    auth: authReducer,
    contoh: contohReducer
})