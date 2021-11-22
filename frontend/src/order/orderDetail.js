
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PageHeader } from './../components/pageHeader'
import ListGroup from 'react-bootstrap/ListGroup'

import { Redirect } from 'react-router-dom'

import { setOrderDetails, setOrderProgressPercent, fetchOrderDetails } from './../order/orderAction';
import {  setGeneratedOrderId } from '../cart/cartAction';

import ProgressBar from 'react-bootstrap/ProgressBar'
import { OrderItem } from './orderItem'
import {useParams} from "react-router-dom";


const OrderDetail = ({ setGeneratedOrderId ,orderDetails,  orderProgressPercent, sandwichList, fetchOrderDetails,isLoggedIn }) => {
    let { id } = useParams();

    

    useEffect(() => {
        
        setGeneratedOrderId('')
        
    }, [setGeneratedOrderId])




    useEffect(() => {
        

        const intervalId = setInterval(() => {
            if (orderDetails.status !== 'ready') {
                fetchOrderDetails(id)
            }
        }, 3000)

        return () => clearInterval(intervalId);
    }, [orderDetails, fetchOrderDetails,id])






    const OrderItems = ({ sandwichIds }) => {
        const sandwichesInOrder = sandwichList.filter(sandwich => sandwichIds.includes(sandwich._id))
         return sandwichesInOrder.map((sandwich, index) => <OrderItem key={index} sandwich={sandwich} />)

    }


    const OrderTotal = ({ sandwichIds }) => {
        const sandwichesInOrder = sandwichList.filter(sandwich => sandwichIds.includes(sandwich._id))
         return (
            <ListGroup.Item>
            <Row>
                <Col>
                    <Row><h4> Order Total </h4>   </Row>
                </Col>
                <Col>
                    <h4 className='float-right'>€ {sandwichesInOrder.reduce((sum, sandwichInOrder) => sum + sandwichInOrder.price, 0)}</h4>
                </Col>               
            </Row>
        </ListGroup.Item>


         )

    }

    if(!isLoggedIn){
        return <Redirect to={`/`} />;

    }else{
        return (

            <Container >
                      
                        <PageHeader headerName={`Confirmed Order # ${orderDetails._id}`} />
                        <Row>
                            <Col><h4> {`Status: ${orderDetails.status}`}</h4></Col>
                            <Col><ProgressBar variant={orderDetails.status === 'ready' ? 'success' : 'info'} animated now={orderProgressPercent} label={orderDetails.status} /></Col>
    
                        </Row>
                        <ListGroup variant='flush'>
                            <OrderItems sandwichIds={orderDetails.sandwichIds} />
                            <OrderTotal sandwichIds={orderDetails.sandwichIds}/>
                        </ListGroup>
                 
            </Container>
        )

    }






   

}


const mapStateToProps = ({ SandwichReducer, OrderReducer,LoginReducer }) => ({
    orderItems: SandwichReducer.orderItems,
    sandwichList: SandwichReducer.sandwichList,
    orderDetails: OrderReducer.orderDetails,
    orderProgressPercent: OrderReducer.orderProgressPercent,
    isLoggedIn: LoginReducer.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({

    setOrderDetails: (order) => dispatch(setOrderDetails(order)),
    setOrderProgressPercent: (orderStatus) => dispatch(setOrderProgressPercent(orderStatus)),
    fetchOrderDetails: (id) => dispatch(fetchOrderDetails(id)),
    setGeneratedOrderId: (generatedOrderId) => dispatch(setGeneratedOrderId(generatedOrderId))


})




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDetail);