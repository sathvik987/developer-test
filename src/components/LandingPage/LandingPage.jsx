import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SearchBox from "../SearchBox/SearchBox";
import ProductCard from "../ProductCard/ProductCard";

import "./landing-page.css"

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: "",
            filter: "",
            allProducts: []
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
        this.setState({ searchField: event.target.value })
    }


    render() {

        let filteredProducts = this.state.allProducts.filter((product) => {
            return this.state.filter ? (product.type === this.state.filter && product.name.toLowerCase().includes(this.state.searchField.toLowerCase())) :
                (product.name.toLowerCase().includes(this.state.searchField.toLowerCase()))
        });

        return (
            <Container fluid>
                <Row className="nav mt-4">
                    <Col lg="2" sm="3" xs="12" className="logo-col cursor-pointer mt-2">
                        Groceries
                    </Col>

                    <Col lg="4" sm="6" xs="12" className="search-col mt-2">
                        <div className="search-box">
                            <SearchBox searchChange={this.onSearchChange}></SearchBox>
                        </div>
                    </Col>

                    <Col lg="2" sm="3" xs="12" className="icons-col mt-2">
                        <FontAwesomeIcon className="favorites cursor-pointer icon" icon={["fa-solid", "heart"]} />
                        <FontAwesomeIcon className="icon" icon={["fa", "user-circle"]} />
                        <FontAwesomeIcon className="cursor-pointer icon" icon={["fa-solid", "cart-shopping"]} />
                    </Col>
                </Row>

                <Row className="products-and-filters mt-3">
                    <Col lg="8" sm="8" xs="12" className="filter-buttons-col">
                        <Button variant="light" size="sm" className="rounded-pill filter-buttons mt-3"
                            onClick={() => { this.setState({ filter: "" }) }}>All items</Button>
                        <Button variant="light" size="sm" className="rounded-pill filter-buttons mt-3"
                            onClick={() => { this.setState({ filter: "drinks" }) }}>Drinks</Button>
                        <Button variant="light" size="sm" className="rounded-pill filter-buttons mt-3"
                            onClick={() => { this.setState({ filter: "fruit" }) }}>Fruit</Button>
                        <Button variant="light" size="sm" className="rounded-pill filter-buttons mt-3"
                            onClick={() => { this.setState({ filter: "bakery" }) }}>Bakery</Button>
                    </Col>

                    <Col lg="8" sm="8" xs="12" className="filter-text mt-4">
                        {this.state.filter ? this.state.filter : "All items"}
                    </Col>


                    <Col lg="11" sm="11" xs="12" className="products mt-4">
                        {
                            filteredProducts.length ? filteredProducts.map((product) => {
                                return <ProductCard key={product.id} name={product.name}></ProductCard>
                            }) : <h4>No items found!!</h4>

                        }
                    </Col>

                </Row>

            </Container>
        );
    }
}

export default LandingPage;