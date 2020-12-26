import {AsyncStorage} from 'react-native'
export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT';

let timer;

const clearLogoutTimer = () => {
    if(timer){
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime =>{

    return dispatch => {
        timer = setTimeout(()=>{
            dispatch(logout());
        }, expirationTime)
    };
}

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData')
    return{type: LOGOUT}
}

export const authenticate = (userId, token, expiryTime) => {
    return dispatch =>{
        dispatch(setLogoutTimer(expiryTime))
        dispatch({type: AUTHENTICATE, userId: userId, token: token})
    };
};