import React from 'react'


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const PageHeader = ({ headerName }) => {



    return (

        <Row>
            <Col>
            <h4 className="font-weight-normal"> {headerName} </h4>
            <hr/>
            
            </Col>
            
        </Row>
    )

}
