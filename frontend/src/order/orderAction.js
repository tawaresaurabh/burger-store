export const FETCH_ORDER_LIST = 'FETCH_ORDER_LIST';
export const SET_ORDER_LIST = 'SET_ORDER_LIST';
export const FETCH_ORDER_DETAILS = 'FETCH_ORDER_DETAILS';
export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS'
export const SET_ORDER_PROGRESS_PERCENT = 'SET_ORDER_PROGRESS_PERCENT'






export const fetchOrderList = ()=>({    
    type:FETCH_ORDER_LIST,     
})



export const fetchOrderDetails = (id)=>({    
    type:FETCH_ORDER_DETAILS,     
    id
})

export const setOrderDetails = (order)=>({    
    type:SET_ORDER_DETAILS,     
    order
})


export const setOrderList = (orderList)=>({
    type:SET_ORDER_LIST,
    orderList        
})


export const setOrderProgressPercent = (orderStatus)=>({
    type:SET_ORDER_PROGRESS_PERCENT,
    orderStatus        
})

