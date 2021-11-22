import React  from 'react';
import { connect } from "react-redux";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { PageHeader } from './../components/pageHeader'
import Form from 'react-bootstrap/Form';

import Image from 'react-bootstrap/Image'
import { Redirect } from 'react-router-dom'

import sandwichHome from './../assets/sandwich-home.jpg'
import { setLoginFormValues, setLogin } from './loginAction';
import Alert from 'react-bootstrap/Alert'

const Login = ({ setLoginFormValues, login, setLogin,loginError,isLoggedIn }) => {


    const handleSubmit = (event) => {
        event.preventDefault()
        setLogin(login.username, login.password)

    }

    const handleChange = (event) => {
        setLoginFormValues({ ...login, [event.target.name]: event.target.value })
    }


    if (isLoggedIn) {
        return <Redirect to={`/sandwiches`} />;

    } else {
        return (

            <Container >
                {
                    loginError && <Alert variant='danger'>{loginError}</Alert>

                }
                <Row>
                    <Col> 
                    <PageHeader headerName='Welcome to Sandwich Store' />
                    <Image src={sandwichHome} rounded/> 
                    </Col>
                    <Col>
                        <PageHeader headerName='Login' />
                        <Form onSubmit={handleSubmit} >

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridUserName">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control required name="username" placeholder="UserName" value={login.username} onChange={handleChange} />
                                </Form.Group>


                            </Form.Row>


                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required type='password' name="password" placeholder="Password" value={login.password} onChange={handleChange} />
                                </Form.Group>
                            </Form.Row>

                            <Button variant="info" type="submit">Login</Button>

                        </Form>


                    </Col>
                </Row>



            </Container>
        )


    }








}


const mapStateToProps = ({ LoginReducer }) => ({
    login: LoginReducer.login,
    token: LoginReducer.token,
    loginError:LoginReducer.loginError,
    isLoggedIn: LoginReducer.isLoggedIn

})

const mapDispatchToProps = (dispatch) => ({
    setLoginFormValues: (login) => dispatch(setLoginFormValues(login)),
    setLogin: (username, password) => dispatch(setLogin(username, password)),





})




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
