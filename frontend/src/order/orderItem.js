import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'

export const OrderItem = ({ sandwich }) => {

    return (

        <ListGroup.Item>
            <Row>
                <Col>
                    <Row><h4> {sandwich.name}  </h4>   </Row>

                    <Row> <i> Toppings </i> </Row>
                    <Row>
                        {
                            sandwich.toppings.map((topping,index) => {
                                return (

                                    <ul key={index}>
                                        <li>{topping.name}</li>


                                    </ul>

                                )
                            })

                        }
                    </Row>
                </Col>

                <Col>
                    <h5 className='float-right'>€ {sandwich.price}</h5>

                </Col>
            </Row>
        </ListGroup.Item>
    )



}