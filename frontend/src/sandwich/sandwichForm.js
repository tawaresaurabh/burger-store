import React, { useEffect } from 'react';
import { connect } from "react-redux";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { PageHeader } from './../components/pageHeader'
import Form from 'react-bootstrap/Form';

import { setCreateSandwichFormValues, setCreateSandwich, setCurrentTopping, resetCurrentTopping, removeTopping, setEditMode, setUpdateSandwich } from './sandwichAction';
import { Redirect } from 'react-router-dom'
import { useLocation } from "react-router-dom";

const SandwichFrom = ({ createdSandwich, setCreateSandwichFormValues, setCreateSandwich, redirectToList, setCurrentTopping, resetCurrentTopping, currentTopping, removeTopping, setEditMode, editMode, setUpdateSandwich, isLoggedIn }) => {
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setCreateSandwichFormValues({ ...location.state.sandwich })
            setEditMode(true)
        }
    }, [location.state, setCreateSandwichFormValues, setEditMode]);


    const addToppingsToList = () => {
        const toppings = [...createdSandwich.toppings, { name: currentTopping }]
        setCreateSandwichFormValues({ ...createdSandwich, toppings })
        resetCurrentTopping()

    }


    const handleChange = (event) => {
        setCreateSandwichFormValues({ ...createdSandwich, [event.target.name]: event.target.value })
    }


    const handleCurrentTopping = (event) => {
        setCurrentTopping(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setCreateSandwich({ ...createdSandwich, imageUrl: `sandwich${Math.floor(Math.random() * 6) + 1}`, })
    }


    const handleUpdate = (event) => {
        event.preventDefault()
        setUpdateSandwich({ ...createdSandwich })
    }

    const handleRemoveTopping = (event) => {
        removeTopping(createdSandwich, event.target.value)
    }

    if (!isLoggedIn) {
        return <Redirect to={`/`} />;

    } else {
        if (redirectToList) {
            return <Redirect to={`/sandwiches`} />;

        } else {
            return (

                <Container >

                    <PageHeader headerName='Sandwich Form' />


                    <Form onSubmit={editMode ? handleUpdate : handleSubmit} >

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridfName">
                                <Form.Label>Sandwich Name</Form.Label>
                                <Form.Control required name="name" placeholder="Sandwich Name" value={createdSandwich.name} onChange={handleChange} />
                            </Form.Group>


                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridlDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" placeholder="Description" value={createdSandwich.description} onChange={handleChange} />
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group controlId="formGridBreadType">
                                <Form.Label>Bread Type</Form.Label>
                                <Form.Control as="select" name="breadType" value={createdSandwich.breadType} onChange={handleChange}>
                                    <option value='Oat'>Oat</option>
                                    <option value='Rye'>Rye</option>
                                    <option value='Wheat'>Wheat</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridlPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='number' required name="price" placeholder="Price in Euros" value={parseInt(createdSandwich.price)} onChange={handleChange} />
                            </Form.Group>
                        </Form.Row>



                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridToppings">
                                <Form.Label>Toppings</Form.Label>
                                <Row>
                                    {
                                        createdSandwich.toppings.map(topping => {
                                            return (
                                                <ul>
                                                    <li>{topping.name}  <Button variant='danger' onClick={handleRemoveTopping} value={topping.name} > X </Button></li>
                                                </ul>

                                            )
                                        })

                                    }

                                </Row>
                                <Col><Form.Control name="currentTopping" placeholder="Add Toppings" value={currentTopping} onChange={handleCurrentTopping} /></Col>

                            </Form.Group>
                            <Button variant="info" disabled={currentTopping.length===0} onClick={addToppingsToList}>Add</Button>
                        </Form.Row>



                        <Button variant="info" type="submit">{editMode ? 'Update' : 'Submit'}</Button>


                    </Form>




                </Container>


            )

        }

    }







}


const mapStateToProps = ({ SandwichReducer, LoginReducer }) => ({
    sandwichList: SandwichReducer.sandwichList,
    toppingList: SandwichReducer.toppingList,
    showToppingSelection: SandwichReducer.showToppingSelection,
    selectedSandwichId: SandwichReducer.selectedSandwichId,
    selectedToppingList: SandwichReducer.selectedToppingList,
    orderItems: SandwichReducer.orderItems,
    createdSandwich: SandwichReducer.createdSandwich,
    redirectToList: SandwichReducer.redirectToList,
    currentTopping: SandwichReducer.currentTopping,
    editMode: SandwichReducer.editMode,
    isLoggedIn: LoginReducer.isLoggedIn,


})

const mapDispatchToProps = (dispatch) => ({
    setCreateSandwichFormValues: (sandwich) => dispatch(setCreateSandwichFormValues(sandwich)),
    setCreateSandwich: (sandwich) => dispatch(setCreateSandwich(sandwich)),
    setCurrentTopping: (topping) => dispatch(setCurrentTopping(topping)),
    resetCurrentTopping: () => dispatch(resetCurrentTopping()),
    removeTopping: (sandwich, topping) => dispatch(removeTopping(sandwich, topping)),
    setEditMode: (editMode) => dispatch(setEditMode(editMode)),
    setUpdateSandwich: (sandwich) => dispatch(setUpdateSandwich(sandwich)),




})




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SandwichFrom);
