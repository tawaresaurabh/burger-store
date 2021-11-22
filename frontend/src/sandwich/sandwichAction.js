export const FETCH_SANDWICH_LIST = 'FETCH_SANDWICH_LIST';
export const SET_SANDWICH_LIST = 'SET_SANDWICH_LIST';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_TOPPING_LIST = 'SET_TOPPING_LIST';



export const FETCH_TOPPING_LIST = 'FETCH_TOPPING_LIST';
export const SET_SELECTED_SANDWICH = 'SET_SELECTED_SANDWICH';
export const SET_SELECTED_TOPPINGS = 'SET_SELECTED_TOPPINGS';
export const SET_SHOW_TOPPING_SELECTION = 'SET_SHOW_TOPPING_SELECTION';
export const SET_EMPTY_CART = 'SET_EMPTY_CART';

export const CREATE_SANDWICH_FORM_VALUES = 'CREATE_SANDWICH_FORM_VALUES';
export const RESET_SANDWICH_FORM_VALUES = 'RESET_SANDWICH_FORM_VALUES';
export const CREATE_SANDWICH = 'CREATE_SANDWICH';

export const FETCH_SANDWICH_DETAILS = 'FETCH_SANDWICH_DETAILS';
export const SET_SANDWICH_DETAILS = 'SET_SANDWICH_DETAILS';


export const DELETE_SANDWICH = 'DELETE_SANDWICH';
export const UPDATE_SANDWICH = 'UPDATE_SANDWICH';

export const SET_CART_ITEMS = 'SET_CART_ITEMS';

export const SET_REDIRECT_TO_LIST = 'SET_REDIRECT_TO_LIST';

export const SET_CURRENT_TOPPING = 'SET_CURRENT_TOPPING';

export const RESET_CURRENT_TOPPING = 'RESET_CURRENT_TOPPING';

export const REMOVE_TOPPING = 'REMOVE_TOPPING';

export const SET_EDIT_MODE = 'SET_EDIT_MODE';













export const fetchSandwichList = ()=>({    
    type:FETCH_SANDWICH_LIST,     
})


export const fetchToppingList = ()=>({    
    type:FETCH_TOPPING_LIST,     
})


export const setSandwichList = (sandwichList)=>({
    type:SET_SANDWICH_LIST,
    sandwichList        
})


export const setToppingList = (toppingList)=>({
    type:SET_TOPPING_LIST,
    toppingList        
})


export const setSelectedToppingList = (selectedToppingList)=>({
    type:SET_SELECTED_TOPPINGS,
    selectedToppingList        
})


export const addToCart = (sandwich)=>({
    type:ADD_TO_CART,
    sandwich        
})


export const setShowToppingSelection = (showToppingSelection)=>({
    type:SET_SHOW_TOPPING_SELECTION,
    showToppingSelection        
})


export const setSelectedSandwichId = (sandwichId)=>({
    type:SET_SELECTED_SANDWICH,
    sandwichId        
})


export const setEmptyCart = ()=>({
    type:SET_EMPTY_CART,
           
})

export const removeFromCart = (sandwichId) => ({
    type:REMOVE_FROM_CART,
    sandwichId

}) 


export const setCreateSandwichFormValues = (sandwich) =>({
    type:CREATE_SANDWICH_FORM_VALUES,
    sandwich

})

export const resetCreateSandwichFormValues = () =>({
    type:RESET_SANDWICH_FORM_VALUES,    

})

export const setCreateSandwich = (sandwich) =>({
    type:CREATE_SANDWICH,
    sandwich

})

export const setUpdateSandwich = (sandwich) =>({
    type:UPDATE_SANDWICH,
    sandwich

})



export const setCartItems = (orderItems) =>({
    type:SET_CART_ITEMS,
    orderItems

})


export const fetchSandwichDetails = (id) =>({
    type:FETCH_SANDWICH_DETAILS,
    id

})


export const setSandwichDetails = (sandwich) =>({
    type:SET_SANDWICH_DETAILS,
    sandwich

})




export const setRedirectToList = (redirectToList) =>({
    type:SET_REDIRECT_TO_LIST,
    redirectToList

})


export const deleteSandwich = (id)=>({
    type:DELETE_SANDWICH,
    id        
})



export const setCurrentTopping = (topping)=>({
    type:SET_CURRENT_TOPPING,
    topping        
})


export const resetCurrentTopping = ()=>({
    type:RESET_CURRENT_TOPPING,
            
})


export const removeTopping = (sandwich, topping)=>({
    type:REMOVE_TOPPING,
    sandwich,
    topping
            
})


export const setEditMode = (editMode)=>({
    type:SET_EDIT_MODE,
    editMode
            
})




