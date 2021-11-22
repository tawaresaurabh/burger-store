export const LOGIN = 'LOGIN';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_CREDENTIALS = 'SET_CREDENTIALS';

export const SET_ROLE = 'SET_ROLE';
export const SET_LOGIN_FORM_VALUES = 'SET_LOGIN_FORM_VALUES';
export const RESET_LOGIN_FORM_VALUES = 'RESET_LOGIN_FORM_VALUES';

export const SET_USER = 'SET_USER';

export const LOGOUT = 'LOGOUT';
export const SHOW_LOGOUT_MODAL = 'SHOW_LOGOUT_MODAL';


export const RESET_TOKEN = 'RESET_TOKEN'
export const RESET_USER = 'RESET_USER'

export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN'

export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'



export const setLogin = (username, password) => ({
    type: LOGIN,
    username,
    password
})

export const setToken = (token) => ({
    type: SET_TOKEN,
    token
})




export const setRole = (role) => ({
    type: SET_ROLE,
    role
})

export const setLoginFormValues = (login) => ({
    type: SET_LOGIN_FORM_VALUES,
    login
})

export const resetLoginFormValues = () => ({
    type: RESET_LOGIN_FORM_VALUES,
})

export const setUser = (user) => ({
    type: SET_USER,
    user
})


export const setShowLogoutModal = (showModal) => ({
    type: SHOW_LOGOUT_MODAL,
    showModal
})

export const resetToken = () => ({
    type: RESET_TOKEN,

})

export const resetUser = () => ({
    type: RESET_USER,

})


export const setIsLoggedIn = (isLoggedIn) => ({
    type: SET_IS_LOGGED_IN,
    isLoggedIn

})

export const setLoginError = (error) => ({
    type: SET_LOGIN_ERROR,
    error

})


