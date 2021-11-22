
import * as CONSTANTS from './cartAction'


const handlGeneratedOrderId = (state = '', action) => {
    switch (action.type) {
        case CONSTANTS.SET_GENERATED_ORDER_ID:
            return action.generatedOrderId
        default:
            return state;
    }


}


function CartReducer(state = {}, action) {
    let newState = {
        generatedOrderId: handlGeneratedOrderId(state.generatedOrderId, action)
    };
    return Object.assign({}, state, newState);


}



export default { CartReducer };