import * as CONSTANTS from './loginAction'


const handleLoginForm = (state = { username: '', password: '' }, action) => {
    switch (action.type) {
        case CONSTANTS.SET_LOGIN_FORM_VALUES:
            return action.login
        case CONSTANTS.RESET_LOGIN_FORM_VALUES:
            return { username: '', password: '' }
        default:
            return state;
    }
}


const handleUser = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.SET_USER:
            return action.user
        case CONSTANTS.RESET_USER:
            return {}
        default:
            return state;
    }
}


const handleToken = (state = '', action) => {
    switch (action.type) {
        case CONSTANTS.SET_TOKEN:
            return action.token
        case CONSTANTS.RESET_TOKEN:
            return ''
        default:
            return state;
    }
}


const handleIsLoggedIn = (state = false, action) => {
    switch (action.type) {
        case CONSTANTS.SET_IS_LOGGED_IN:
            return action.isLoggedIn
        default:
            return state;
    }
}




const handleShowLogoutModal = (state = false, action) => {
    switch (action.type) {
        case CONSTANTS.SHOW_LOGOUT_MODAL:
            return action.showModal
        default:
            return state;
    }
}


const handleLoginError = (state = '', action) => {
    switch (action.type) {
        case CONSTANTS.SET_LOGIN_ERROR:
            return action.error
        default:
            return state;
    }
}




function LoginReducer(state = {}, action) {
    let newState = {
        login: handleLoginForm(state.login, action),
        token: handleToken(state.token, action),        
        user: handleUser(state.user, action),
        showLogoutModal: handleShowLogoutModal(state.showLogoutModal, action),
        isLoggedIn: handleIsLoggedIn(state.isLoggedIn, action),
        loginError: handleLoginError(state.loginError, action),
    };
    return Object.assign({}, state, newState);
}



export default { LoginReducer };