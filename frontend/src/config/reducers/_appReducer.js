import SandwichReducer from '../../sandwich/sandwichReducer';
import CartReducer from '../../cart/cartReducer';
import OrderReducer from '../../order/orderReducer';
import LoginReducer from '../../login/loginReducer';





let appReducer = Object.assign({}, 
  SandwichReducer,
  CartReducer,
  OrderReducer,
  LoginReducer

);

export default appReducer;