export const CONFIRM_ORDER = 'CONFIRM_ORDER';
export const SET_GENERATED_ORDER_ID = 'SET_GENERATED_ORDER_ID'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const confirmOrder = (order)=>({    
    type:CONFIRM_ORDER,     
    order
})

export const setGeneratedOrderId = (generatedOrderId)=>({
    type:SET_GENERATED_ORDER_ID,
    generatedOrderId        
})


export const removeFromCart = (sandwichId)=>({
    type:REMOVE_FROM_CART,
    sandwichId        
})