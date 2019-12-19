import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Reducer from './Redux/Reducer';
import ReduxThunk from 'redux-thunk';

const storeReducer = createStore(Reducer,{}, applyMiddleware(ReduxThunk))

ReactDOM.render(
<Provider store={storeReducer}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
