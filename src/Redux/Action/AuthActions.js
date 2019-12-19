import Axios from "axios";
import {API_URL} from '../../support/API_URL';

// export const Login = (data) => {
//     return{
//         type: 'LOGIN',
//         payload: data
//     }
// }

export const Login = (username, password) => {
    return(dispatch) => {
        Axios.get(API_URL + `/users?username=${username}&password=${password}`)
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: 'LOGIN',
                payload: res.data[0]
            })
        })
        .catch((err) => {
            dispatch(({
                type: 'LOGOUT'
            }))
        })
    }
}

export const keepLogin = () => {
    return(dispatch) => {

        let username = localStorage.getItem('username')
        Axios.get(API_URL + `/users?username=${username}`)
        .then((res) => {
            dispatch({
                type:'CONTOH'
            })
            dispatch({
                type: 'LOGIN',
                payload: res.data[0]
            })
        })
        .catch((err) => {
            console.log(err)       
        })
    }

}
export const Logout = () => {
    return{
        type: 'LOGOUT'
    }
}

export const addToCart = (data) => {
    return{
        type: 'ADD_TO_CART',
        payload: data
    }
}