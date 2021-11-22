
import * as CONSTANTS from './sandwichAction'


const handleSandwichList = (state = [], action) => {
    switch (action.type) {
        case CONSTANTS.SET_SANDWICH_LIST:
            return action.sandwichList;
        default:
            return state;
    }
}


const handleRedirectToList = (state = false, action) => {
    switch (action.type) {
        case CONSTANTS.SET_REDIRECT_TO_LIST:
            return action.redirectToList;
        default:
            return state;
    }
}



const handleCartActions = (state = [], action) => {
    switch (action.type) {
        case CONSTANTS.ADD_TO_CART:
            return [...state, action.sandwich]
        case CONSTANTS.SET_EMPTY_CART:
            return [];
        case CONSTANTS.SET_CART_ITEMS:
            return action.orderItems
        default:
            return state;
    }
}


const handleCurrentTopping = (state = '', action) => {
    switch (action.type) {
        case CONSTANTS.SET_CURRENT_TOPPING:
            return action.topping
        case CONSTANTS.RESET_CURRENT_TOPPING:
            return ''
        default:
            return state;
    }
}



const handleEditMode = (state = false, action) => {
    switch (action.type) {
        case CONSTANTS.SET_EDIT_MODE:
            return action.editMode       
        default:
            return state;
    }
}

const handleCreateSandwich = (state = {
    name: '', description: '', imageUrl: '', breadType: 'Oat', price: 0, toppings: [], editMode: false,
}, action) => {

    switch (action.type) {
        case CONSTANTS.CREATE_SANDWICH_FORM_VALUES:
            return action.sandwich
        case CONSTANTS.RESET_SANDWICH_FORM_VALUES:
            return { name: '', description: '', imageUrl: '', breadType: 'Oat', price: 0, toppings: [], editMode: false, }
        case CONSTANTS.SET_SANDWICH_DETAILS:
            return action.sandwich
        case CONSTANTS.REMOVE_TOPPING:{            
                const newToppings = action.sandwich.toppings.filter(topping => topping.name !== action.topping)               
                return {...action.sandwich ,toppings: newToppings}              
            }

        default:
            return state;
    }
}




function SandwichReducer(state = {}, action) {
    let newState = {
        sandwichList: handleSandwichList(state.sandwichList, action),
        orderItems: handleCartActions(state.orderItems, action),
        createdSandwich: handleCreateSandwich(state.createdSandwich, action),
        redirectToList: handleRedirectToList(state.redirectToList, action),
        currentTopping: handleCurrentTopping(state.currentTopping, action),
        editMode:handleEditMode(state.editMode,action)
    };
    return Object.assign({}, state, newState);
}



export default { SandwichReducer };