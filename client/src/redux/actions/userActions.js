import axios from 'axios'
import { userConstants } from '../constants' 
import { alertActions } from './alertActions' 
import { history } from '../helpers' 

export const userActions = {
    login,
    logout,
} 

function login(user) {
    return dispatch => {
        dispatch(request({ user })) 

        axios.post(`http://192.168.0.105:3000/auth/login`,  user)
            .then(res => {
                console.log(res)
                dispatch(success(res))
                history.push('/')
                localStorage.setItem('user', JSON.stringify(res.data.token))
            }).catch(e => {
                dispatch(failure(e.response.data.message))
                dispatch(alertActions.error(e.response.data.message))
            })
    } 

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT } 
}