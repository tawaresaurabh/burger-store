
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PageHeader } from './../components/pageHeader'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { confirmOrder, setGeneratedOrderId } from './cartAction';
import { setEmptyCart, setCartItems } from './../sandwich/sandwichAction';
import { setOrderDetails, setOrderProgressPercent, fetchOrderDetails } from './../order/orderAction';

import { Redirect } from 'react-router-dom'



const Cart = ({ orderItems, confirmOrder, setGeneratedOrderId, generatedOrderId, setEmptyCart, setOrderDetails, setOrderProgressPercent, setCartItems, user, isLoggedIn }) => {



    useEffect(() => {
        if (orderItems.length > 0) {
            localStorage.setItem('orderItems', JSON.stringify(orderItems));
        }
        if (orderItems.length === 0 && localStorage.getItem('orderItems')) {
            setCartItems(JSON.parse(localStorage.getItem('orderItems')))
        }

    }, [setCartItems, orderItems])



    useEffect(() => {

        setGeneratedOrderId('')

    }, [setGeneratedOrderId])




    const handleConfirmOrder = () => {
        setOrderDetails({})
        setOrderProgressPercent('reset')
        const sandwichIds = orderItems.map(orderItem => orderItem._id);

        const order = {
            userId: user._id,
            status: 'ordered',
            sandwichIds
        }
        confirmOrder(order)
        setEmptyCart()
        localStorage.removeItem('orderItems')

    }


    const handleRemoveOrderItem = (event) => {
        const newOrderItems = orderItems.filter((orderItem, index) => index !== parseInt(event.target.value));
        setCartItems(newOrderItems)
        if (newOrderItems.length === 0) {
            localStorage.clear()
        }
    }

    if (!isLoggedIn) {
        return <Redirect to={`/`} />;

    } else {

        if (generatedOrderId) {
            return <Redirect to={`/orderDetail/${generatedOrderId}`} />;


        } else {
            return (


                <Container >

                    <PageHeader headerName='Cart' />
                    <ListGroup variant='flush'>
                        <h5>Order Items</h5>
                        {
                            orderItems.map((orderItem, index) => {


                                return (
                                    <ListGroup.Item key={orderItem._id} >
                                        <Row>
                                            <Col>
                                                <Row><h5 className="font-weight-normal"> {orderItem.name}  </h5>   </Row>
                                                <Row> <i> Toppings </i> </Row>
                                                <Row>
                                                    {
                                                        orderItem.toppings.map(topping => {
                                                            return (
                                                                <ul key={topping._id}>
                                                                    <li>{topping.name}</li>
                                                                </ul>
                                                            )
                                                        })
                                                    }

                                                </Row>
                                            </Col>
                                            <Col>
                                                <h5 className='float-right'>€ {orderItem.price}</h5>

                                            </Col>
                                            <Col>
                                                <Button onClick={handleRemoveOrderItem} value={index} className='float-right' variant='danger'>   X</Button>

                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                )

                            })
                        }


                        {
                            orderItems.length > 0 &&
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <Row><h4> Order Total </h4>   </Row>
                                    </Col>
                                    <Col>
                                        <h4 className='float-right'>€ {orderItems.reduce((sum, orderItem) => sum + orderItem.price, 0)}</h4>

                                    </Col>

                                    <Col>
                                        <h4 className='float-right'>Total  {orderItems.length} items</h4>

                                    </Col>

                                </Row>
                            </ListGroup.Item>

                        }


                    </ListGroup>



                    {
                        orderItems.length > 0 &&
                        <Button style={{ marginTop: '20px' }} onClick={handleConfirmOrder} className='float-right' variant='info'>    Confirm Order</Button>

                    }




                </Container>
            )

        }


    }





}


const mapStateToProps = ({ SandwichReducer, OrderReducer, CartReducer, LoginReducer }) => ({
    orderItems: SandwichReducer.orderItems,
    sandwichList: SandwichReducer.sandwichList,
    orderDetails: OrderReducer.orderDetails,
    orderProgressPercent: OrderReducer.orderProgressPercent,
    generatedOrderId: CartReducer.generatedOrderId,
    user: LoginReducer.user,
    isLoggedIn: LoginReducer.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({
    confirmOrder: (order) => dispatch(confirmOrder(order)),
    setEmptyCart: () => dispatch(setEmptyCart()),
    setOrderDetails: (order) => dispatch(setOrderDetails(order)),
    setOrderProgressPercent: (orderStatus) => dispatch(setOrderProgressPercent(orderStatus)),
    fetchOrderDetails: (id) => dispatch(fetchOrderDetails(id)),
    setGeneratedOrderId: (generatedOrderId) => dispatch(setGeneratedOrderId(generatedOrderId)),
    setCartItems: (cartItems) => dispatch(setCartItems(cartItems))


})




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);