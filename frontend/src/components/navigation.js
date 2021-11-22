import React from 'react';
import { connect } from "react-redux";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { FaGlassCheers, FaShoppingCart } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import { setShowLogoutModal, resetToken, resetUser, setIsLoggedIn,resetLoginFormValues } from './../login/loginAction';






function Navigation({ orderItems, user, setShowLogoutModal, showLogoutModal, resetUser, resetToken, setIsLoggedIn, isLoggedIn ,resetLoginFormValues}) {


    const handleLogoutModal = () => {
        setShowLogoutModal(true)
    }

    const handleLogout = () => {
        resetUser()
        resetToken()
        setIsLoggedIn(false)
        localStorage.clear()
        setShowLogoutModal(false)
        resetLoginFormValues()

    }

    const handleClose = () => {
        setShowLogoutModal(false)
    }






    return (
        <Container>
            {
                isLoggedIn &&

                <Row style={{ marginBottom: '10%' }}>
                    <Col>

                        <Navbar fixed='top' expand="xl" bg="light" variant="light" className="shadow-lg  bg-white rounded">
                            <LinkContainer to="/sandwiches">

                                <Navbar.Brand>Sandwich Store <FaGlassCheers></FaGlassCheers></Navbar.Brand>
                            </LinkContainer>

                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    {
                                        user.role === 'customer' &&
                                        <LinkContainer to="/orders">
                                            <Nav.Link>My Orders</Nav.Link>
                                        </LinkContainer>

                                    }


                                    {
                                        user.role === 'admin' &&
                                        <LinkContainer to="/orders">
                                            <Nav.Link>All Orders</Nav.Link>
                                        </LinkContainer>

                                    }



                                    {
                                        user.role === 'admin' && <LinkContainer to="/create">
                                            <Nav.Link>Create</Nav.Link>
                                        </LinkContainer>


                                    }                                 
                                </Nav>
                                <Nav>

                                    {
                                        user.role === 'customer' && <LinkContainer to="/cart">
                                            <Nav.Link>
                                                <FaShoppingCart size={40} /> <b>{orderItems.length}</b>
                                            </Nav.Link>
                                        </LinkContainer>

                                    }

                                    <Button variant='danger' onClick={handleLogoutModal}>{`Logout ${user.username} (${user.role})`}</Button>

                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>


            }


            {
                !isLoggedIn &&

                <Row style={{ marginBottom: '10%' }}>
                    <Col>

                        <Navbar fixed='top' expand="xl" bg="light" variant="light" className="shadow-lg  bg-white rounded">
                            <LinkContainer to="/">
                                <Navbar.Brand>Sandwich Store <FaGlassCheers></FaGlassCheers></Navbar.Brand>
                            </LinkContainer>

                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        </Navbar>
                    </Col>
                </Row>


            }





            {
                showLogoutModal &&

                <Modal
                    show={showLogoutModal}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Logging Out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to log out?
        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
          </Button>
                        <Button variant="danger" onClick={handleLogout}>Logout</Button>
                    </Modal.Footer>
                </Modal>

            }

        </Container>


    );
}


const mapStateToProps = ({ SandwichReducer, LoginReducer }) => ({
    orderItems: SandwichReducer.orderItems,
    user: LoginReducer.user,
    showLogoutModal: LoginReducer.showLogoutModal,
    isLoggedIn: LoginReducer.isLoggedIn

})

const mapDispatchToProps = (dispatch) => ({
    resetToken: () => dispatch(resetToken()),
    resetUser: () => dispatch(resetUser()),
    setShowLogoutModal: (showLogoutModal) => dispatch(setShowLogoutModal(showLogoutModal)),
    setIsLoggedIn: (isLoggedIn) => dispatch(setIsLoggedIn(isLoggedIn)),
    resetLoginFormValues: () => dispatch(resetLoginFormValues()),
    

})




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);


