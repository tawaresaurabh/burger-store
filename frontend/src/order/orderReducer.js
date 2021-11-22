import * as CONSTANTS from './orderAction'


const handleOrderList = (state = [], action) => {
    switch (action.type) {
        case CONSTANTS.SET_ORDER_LIST:
            return action.orderList
        default:
            return state;
    }
}



const handleOrderDetails = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.SET_ORDER_DETAILS:
            return action.order
        default:
            return state;
    }
}




const handleOrderProgressPercent = (state = 0, action) => {
    switch (action.type) {
        case CONSTANTS.SET_ORDER_PROGRESS_PERCENT:
            switch (action.orderStatus) {
                case 'reset':
                    return 0;
                case 'ordered':
                    return 25;
                case 'received':
                    return 50;
                case 'inQueue':
                    return 75;
                case 'ready':
                    return 100;
                default:
                    return 0;
            }

        default:
            return state;
    }
}




function OrderReducer(state = {}, action) {
    let newState = {
        orderList:handleOrderList(state.orderList,action),
        orderDetails:handleOrderDetails(state.orderDetails,action),
        orderProgressPercent:handleOrderProgressPercent(state.orderProgressPercent,action)


    };
    return Object.assign({}, state, newState);
}



export default { OrderReducer };