import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { PageHeader } from './../components/pageHeader'
import Dropdown from 'react-bootstrap/Dropdown'
import { fetchSandwichList, fetchToppingList, setSelectedToppingList, addToCart, setShowToppingSelection, setSelectedSandwichId, setRedirectToList, deleteSandwich, setCartItems } from './sandwichAction';
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { setIsLoggedIn,setUser,setToken } from './../login/loginAction';



const Sandwiches = ({ fetchSandwichList, addToCart, sandwichList, setRedirectToList, deleteSandwich, orderItems, setCartItems, isLoggedIn, user ,setIsLoggedIn,setUser,setToken,token}) => {


    const history = useHistory();



    // useEffect(() => {
    //     if(!isLoggedIn && localStorage.getItem('isLoggedIn')){
    //         setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')))
    //         setToken(JSON.parse(localStorage.getItem('token')))
    //         setUser(JSON.parse(localStorage.getItem('user')))
    //     }

       
       
       
       

    // }, [])


    useEffect(() => {
        setRedirectToList(false);
    }, [setRedirectToList])


    useEffect(() => {
        fetchSandwichList();
    }, [fetchSandwichList])


    useEffect(() => {

        if (orderItems.length > 0) {
            localStorage.setItem('orderItems', JSON.stringify(orderItems));
        }
        if (orderItems.length === 0 && localStorage.getItem('orderItems')) {
            setCartItems(JSON.parse(localStorage.getItem('orderItems')))
        }

    }, [orderItems, setCartItems])



    const chunk = (arr, chunkSize = 1, cache = []) => {
        const tmp = [...arr]
        if (chunkSize <= 0) return cache
        while (tmp.length) cache.push(tmp.splice(0, chunkSize))
        return cache
    }



    const handleAddToCart = (event) => {
        const sandwichToCart = sandwichList.find(sandwich => sandwich._id === event.target.value)
        addToCart(sandwichToCart)
    }



    const handleDelete = (id) => {
        deleteSandwich(id)
    }

    const handleEdit = (id) => {
        const sandwich = sandwichList.find(sandwich => sandwich._id === id)
        history.push('/create', { sandwich })

    }



    const sandwichesChunks = chunk(sandwichList, 4);

    if (!isLoggedIn) {
        return <Redirect to={`/`} />;


    } else {
        return (
            <Container >

                <PageHeader headerName='Sandwich Menu' />



                {
                    sandwichesChunks.map((sandwichChunk, index) => {
                        const sandwichCols = sandwichChunk.map((sandwich, index) => {
                            return (
                                <Col xs="3" key={index}>

                                    <Card
                                        bg='light'
                                        key={index}
                                        text='dark'
                                        style={{ boxShadow: '0 10px 16px 0', height: '40rem' }}
                                        className="mb-2">

                                        <Card.Img variant="top" height={250} src={sandwich.sandwhichImage} />

                                        <Card.Body>
                                            <Card.Title>{sandwich.name}    €{sandwich.price} </Card.Title>
                                            <Card.Text>
                                                {sandwich.description}

                                                <hr />
                                                Toppings
                                                <hr />
                                                <ul>
                                                    {
                                                        sandwich.toppings.map((topping, index) => <li key={index}>{topping.name}</li>)

                                                    }

                                                </ul>
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row>

                                                {
                                                    user.role === 'customer' && <Col><Button variant='info' value={sandwich._id} onClick={handleAddToCart}>Add to Cart</Button></Col>
                                                }

                                                {
                                                    user.role === 'admin' && <Col>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="info" id="dropdown-basic">Actions</Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => handleDelete(sandwich._id)}>Delete</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => handleEdit(sandwich._id)}>Edit</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                }


                                            </Row>


                                        </Card.Footer>

                                    </Card>

                                </Col>
                            );
                        });
                        return <Row key={index}>{sandwichCols}</Row>
                    })



                }


            </Container>

        );





    }






}


const mapStateToProps = ({ SandwichReducer, LoginReducer }) => ({
    sandwichList: SandwichReducer.sandwichList,
    toppingList: SandwichReducer.toppingList,
    showToppingSelection: SandwichReducer.showToppingSelection,
    selectedSandwichId: SandwichReducer.selectedSandwichId,
    selectedToppingList: SandwichReducer.selectedToppingList,
    orderItems: SandwichReducer.orderItems,
    token: LoginReducer.token,
    user: LoginReducer.user,
    isLoggedIn: LoginReducer.isLoggedIn,    

})

const mapDispatchToProps = (dispatch) => ({
    fetchSandwichList: () => dispatch(fetchSandwichList()),
    fetchToppingList: () => dispatch(fetchToppingList()),
    addToCart: (sandwich) => dispatch(addToCart(sandwich)),
    setSelectedToppingList: (selectedToppings) => dispatch(setSelectedToppingList(selectedToppings)),
    setShowToppingSelection: (showToppingSelection) => dispatch(setShowToppingSelection(showToppingSelection)),
    setSelectedSandwichId: (selectedSandwichId) => dispatch(setSelectedSandwichId(selectedSandwichId)),
    setRedirectToList: (redirectToList) => dispatch(setRedirectToList(redirectToList)),
    deleteSandwich: (id) => dispatch(deleteSandwich(id)),
    setCartItems: (cartItems) => dispatch(setCartItems(cartItems)),
    setIsLoggedIn: (isLoggedIn) => dispatch(setIsLoggedIn(isLoggedIn)),
    setUser: (user) => dispatch(setUser(user)),
    setToken: (token) => dispatch(setToken(token)),

    




})




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sandwiches);



