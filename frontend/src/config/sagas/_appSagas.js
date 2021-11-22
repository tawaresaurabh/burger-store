import SandwichSagas from './../../sandwich/sandwichSaga'
import OrderSagas from './../../order/orderSaga'
import CartSagas from './../../cart/cartSaga'
import LoginSagas from './../../login/loginSaga'



let appSagas = [];

export default appSagas;

appSagas.push(SandwichSagas);
appSagas.push(OrderSagas);
appSagas.push(CartSagas);
appSagas.push(LoginSagas);