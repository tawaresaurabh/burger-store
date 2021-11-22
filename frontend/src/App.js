import React from 'react';

import Navigation from './components/navigation';
import Container from 'react-bootstrap/Container';
import Orders from './order/orders'
import Sandwiches from './sandwich/sandwiches'
import Cart from './cart/cart'
import OrderDetail from './order/orderDetail'
import SandwichFrom from './sandwich/sandwichForm'
import Login from './login/login'
import { getStore } from './config/redux/_storeConfig';
import { Provider } from 'react-redux';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
const store = getStore();
function App() {
  return (

    <Provider store={store}>
      <Router>
        <Container>
          <Navigation />

          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/sandwiches" exact component={Sandwiches}></Route>
            <Route path="/orders" component={Orders}></Route>            
            <Route path="/cart" component={Cart}></Route>  
            <Route path="/orderDetail/:id" component={OrderDetail}></Route>  
            <Route path="/create" component={SandwichFrom}></Route>          
          </Switch>          
        </Container>
      </Router>
    </Provider>


  );
}



export default App;
