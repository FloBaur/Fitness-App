import * as actions from "../actions/ACTION_Authentication";


const initialState = {
    token: null,
    userId: null
};

export default (state = initialState, action) => {
    switch (action.type){
        case actions.SIGN_IN:
            return {token: action.token, userId: action.userId}
        case actions.SIGN_UP:
            return {token: action.token, userId: action.userId}
        case actions.AUTHENTICATE:
            return {token: action.token, userId: action.userId}
        case actions.LOGOUT:
            return initialState;
        default:
            return state;
    }
}