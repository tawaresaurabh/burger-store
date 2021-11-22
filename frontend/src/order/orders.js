import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { PageHeader } from './../components/pageHeader'


import { fetchOrderList, setOrderList, fetchOrderDetails } from './orderAction'
import { fetchSandwichList } from './../sandwich/sandwichAction'

import { Redirect } from 'react-router-dom'

const Orders = ({ fetchSandwichList, fetchOrderList, orderList, setOrderList, sandwichList,isLoggedIn }) => {


    useEffect(() => {
        fetchSandwichList()
        fetchOrderList()

        const intervalId = setInterval(() => {

            fetchOrderList()

        }, 5000)

        return () => clearInterval(intervalId);



    }, [fetchSandwichList, fetchOrderList])





    const showOrderDetails = (event) => {
        const clickedOrder = orderList.find(order => order._id === event.target.value)

        const updatedOrder = { ...clickedOrder, showOrderDetails: !clickedOrder.showOrderDetails }
        setOrderList(orderList.map(order => order._id !== clickedOrder._id ? order : updatedOrder))


    }

    const OrderDetail = ({ sandwichIds }) => {


        const sandwichesInOrder = sandwichList.filter(sandwich => sandwichIds.includes(sandwich._id))



        return (
            sandwichesInOrder.map((sandwich, index) => {


                return (

                    <ListGroup.Item key={index}>
                        <Row>
                            <Col>
                                <Row><h4> {sandwich.name}  </h4>   </Row>

                                <Row> <i> Toppings </i> </Row>
                                <Row>
                                    {
                                        sandwich.toppings.map(topping => {
                                            return (

                                                <ul key={topping._id}>
                                                    <li>{topping.name}</li>


                                                </ul>

                                            )
                                        })

                                    }


                                </Row>


                            </Col>

                        </Row>


                    </ListGroup.Item>
                )

            })





        )




    }

    if (!isLoggedIn) {
        return <Redirect to={`/`} />;

    } else {
        return (
            <Container >

                <PageHeader headerName='My Orders' />

                {

                    <ListGroup variant='flush'>

                        <ListGroup.Item  >
                            <Row>
                                <Col> <h5 className="font-weight-normal">Order #</h5> </Col>
                                <Col><h5 className="font-weight-normal">Order Status</h5></Col>
                                <Col> <h5 className="font-weight-normal">Action</h5></Col>


                            </Row>

                        </ListGroup.Item>

                        {

                            orderList.map((order, index) => {

                                return (
                                    <ListGroup.Item key={index} >
                                        <Row>
                                            <Col>{order._id}</Col>
                                            <Col>{order.status}</Col>
                                            <Col><Button variant='info' value={order._id} onClick={showOrderDetails}> {order.showOrderDetails ? 'Hide Details' : 'Show Details'}</Button> </Col>
                                        </Row>
                                        {
                                            order.showOrderDetails &&

                                            <Row>
                                                <ListGroup variant='flush'>
                                                    <OrderDetail sandwichIds={order.sandwichIds} />
                                                </ListGroup>
                                            </Row>

                                        }
                                    </ListGroup.Item>

                                )

                            })


                        }

                    </ListGroup>
                }
            </Container>
        );

    }










}





const mapStateToProps = ({ OrderReducer, SandwichReducer, LoginReducer }) => ({
    orderList: OrderReducer.orderList,
    sandwichList: SandwichReducer.sandwichList,
    isLoggedIn: LoginReducer.isLoggedIn,


})

const mapDispatchToProps = (dispatch) => ({
    fetchSandwichList: () => dispatch(fetchSandwichList()),
    fetchOrderList: () => dispatch(fetchOrderList()),
    setOrderList: (orderList) => dispatch(setOrderList(orderList)),
    fetchOrderDetails: (id) => dispatch(fetchOrderDetails(id))



})




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);

