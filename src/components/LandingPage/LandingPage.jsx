import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SearchBox from "../SearchBox/SearchBox";
import ProductCard from "../ProductCard/ProductCard";
import CheckOut from "../CheckOut/CheckOut";

import "./landing-page.css"

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: "",
            filter: "",
            allProducts: [],
            favoriteProducts: [],
            cart: [],
            route: "landing-page"
        }
    }

    componentDidMount() {
        this.getAllProducts()
    }

    getAllProducts = async () => {
        try {
            let res = await (await fetch("https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all")).json();
            this.setState({ allProducts: res })
        } catch (error) {
            console.log(error);
        }
    }

    onSearchChange = (event) => {
        this.changeRoute("landing-page");
        this.setState({ searchField: event.target.value });
    }

    toggleFavoriteProduct = (productId) => {
        if (this.state.favoriteProducts.includes(productId)) {
            this.setState((prevState) => ({
                favoriteProducts: prevState.favoriteProducts.filter((id) => id !== productId),
            }));
        } else {
            this.setState((prevState) => ({
                favoriteProducts: [...prevState.favoriteProducts, productId],
            }));
        }
    }

    toggleCart = (product) => {
        if (this.state.cart.filter((p) => p.id === product.id).length) {
            this.setState((prevState) => {
                let totalAvailable = 0
                return {
                    cart: prevState.cart.filter((p) => {
                        if (p.id === product.id) {
                            totalAvailable = p.totalAvailable
                        }
                        return p.id !== product.id
                    }),
                    allProducts: prevState.allProducts.map((item) => {
                        if (item.id === product.id) {
                            return { ...item, available: totalAvailable }
                        } else {
                            return item
                        }
                    })
                }
            });
        } else {
            this.setState((prevState) => ({
                cart: [...prevState.cart, { ...product, quantity: 1, totalAvailable: product.available, available: product.available - 1 }],
                allProducts: prevState.allProducts.map((item) => {
                    if (item.id === product.id) {
                        if (item.available > 0) {
                            let available = item.available - 1
                            return { ...item, available: available }
                        } else {
                            return item
                        }
                    } else {
                        return item
                    }
                })
            }));
        }
    }

    removeFromCart = (product) => {
        this.setState((prevState) => {
            let totalAvailable = 0
            return {
                cart: prevState.cart.filter((p) => {
                    if (p.id === product.id) {
                        totalAvailable = p.totalAvailable
                    }
                    return p.id !== product.id
                }),
                allProducts: prevState.allProducts.map((item) => {
                    if (item.id === product.id) {
                        return { ...item, available: totalAvailable }
                    } else {
                        return item
                    }
                })
            }
        });
    }

    increment = (productId) => {
        this.setState((prevState) => ({
            cart: prevState.cart.map((item) => {
                if (item.id === productId) {
                    if (item.available > 0) {
                        let available = item.available - 1
                        let quantity = item.quantity + 1
                        return { ...item, quantity: quantity, available: available }
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            }),
            allProducts: prevState.allProducts.map((item) => {
                if (item.id === productId) {
                    if (item.available > 0) {
                        let available = item.available - 1
                        return { ...item, available: available }
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })
        }));
    }

    decrement = (productId) => {
        this.setState((prevState) => {
            let decrement = null
            return {
                cart: prevState.cart.map((item) => {
                    if (item.id === productId) {
                        if (item.quantity > 1) {
                            decrement = true
                            let available = item.available + 1
                            let quantity = item.quantity - 1
                            return { ...item, quantity: quantity, available: available }
                        } else {
                            return item
                        }
                    } else {
                        return item
                    }
                }),
                allProducts: prevState.allProducts.map((item) => {
                    if (item.id === productId) {
                        if (decrement) {
                            let available = item.available + 1
                            return { ...item, available: available }
                        } else {
                            return item
                        }
                    } else {
                        return item
                    }
                })
            }
        });
    }

    changeRoute = (route) => {
        this.setState({ route: route })
    }


    render() {

        let filteredProducts = this.state.allProducts.filter((product) => {
            return this.state.filter ? (product.type === this.state.filter && product.name.toLowerCase().includes(this.state.searchField.toLowerCase())) :
                (product.name.toLowerCase().includes(this.state.searchField.toLowerCase()))
        });

        let title;
        let page;
        if (this.state.route === "landing-page") {
            title = <Col lg="8" sm="8" xs="12" className="filter-text mt-4">
                {this.state.filter ? this.state.filter : "All items"}
            </Col>

            page = <Col lg="11" sm="11" xs="11" className="router-col mt-4">
                <div className="products mt-3">
                    {
                        filteredProducts.length ? filteredProducts.map((product) => {
                            return <ProductCard key={product.id} product={product}
                                favorite={this.state.favoriteProducts.includes(product.id)}
                                addedToCart={this.state.cart.some(p => p.id === product.id)}
                                toggleFavoriteProduct={this.toggleFavoriteProduct}
                                toggleCart={this.toggleCart}>
                            </ProductCard>
                        }) : <h4>No items found.</h4>

                    }
                </div>
            </Col>

        } else {
            title = <Col lg="8" sm="8" xs="12" className="filter-text mt-4">
                <FontAwesomeIcon className="cursor-pointer icon" icon={["fas", "arrow-left"]}
                    onClick={() => this.changeRoute("landing-page")} /> Checkout
            </Col>
            page = <Col lg="11" sm="11" xs="11" className="router-col mt-4">
                <div className="router-div mt-3">
                    <CheckOut cart={this.state.cart} removeFromCart={this.removeFromCart} increment={this.increment}
                        decrement={this.decrement}></CheckOut>
                </div>
            </Col>

        }




        return (
            <Container fluid>
                <Row className="nav mt-4">
                    <Col lg="2" sm="3" xs="12" className="logo-col cursor-pointer mt-2" onClick={() => this.changeRoute("landing-page")}>
                        Groceries
                    </Col>

                    <Col lg="4" sm="6" xs="12" className="search-col mt-2">
                        <div className="search-box">
                            <SearchBox searchChange={this.onSearchChange}></SearchBox>
                        </div>
                    </Col>

                    <Col lg="2" sm="3" xs="12" className="icons-col mt-2">
                        <div>
                            <span className="favorites-count">{this.state.favoriteProducts.length}</span>
                            <FontAwesomeIcon className="favorites icon" icon={["fas", "heart"]} />
                        </div>
                        <div>
                            <FontAwesomeIcon className="icon" icon={["fas", "user-circle"]} />
                        </div>
                        <div>
                            <span className="cart-count">{this.state.cart.length}</span>
                            <FontAwesomeIcon className="cursor-pointer icon" icon={["fas", "cart-shopping"]} onClick={() => this.changeRoute("checkout-page")} />
                        </div>
                    </Col>
                </Row>

                <Row className="products-and-filters mt-3">
                    <Col lg="8" sm="8" xs="12" className="filter-buttons-col">
                        <Button variant="light" size="sm" className="rounded-pill filter-buttons mt-3"
                            onClick={() => { this.changeRoute("landing-page"); this.setState({ filter: "" }) }}>All items</Button>
                        <Button variant="light" size="sm" className="rounded-pill filter-buttons mt-3"
                            onClick={() => { this.changeRoute("landing-page"); this.setState({ filter: "drinks" }) }}>Drinks</Button>
                        <Button variant="light" size="sm" className="rounded-pill filter-buttons mt-3"
                            onClick={() => { this.changeRoute("landing-page"); this.setState({ filter: "fruit" }) }}>Fruit</Button>
                        <Button variant="light" size="sm" className="rounded-pill filter-buttons mt-3"
                            onClick={() => { this.changeRoute("landing-page"); this.setState({ filter: "bakery" }) }}>Bakery</Button>
                    </Col>

                    {title}


                    {page}

                </Row>

            </Container>
        );
    }
}

export default LandingPage;