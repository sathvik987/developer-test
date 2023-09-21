import { Component } from "react";
import "./checkout.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        let offers = [];
        let subtotal = 0;
        let discount = 0;
        let total = 0;
        for (const item of this.props.cart) {
            subtotal = subtotal + (Number(item.price.split("£")[1]) * item.quantity)
            if (item.name === "Coca-Cola" && item.quantity >= 6) {
                for (const product of this.props.freeOfferProducts) {
                    if (product.name === "Coca-Cola") {
                        offers.push(product)
                        discount = discount + Number(product.price.split("£")[1])
                        break
                    }
                }
            }
            if (item.name === "Croissants" && item.quantity >= 3) {
                for (const product of this.props.freeOfferProducts) {
                    if (product.name === "Coffee") {
                        offers.push(product)
                        discount = discount + Number(product.price.split("£")[1])
                        break
                    }
                }
            }
        }
        subtotal = subtotal + discount;
        total = subtotal - discount;

        return (

            <Row className="checkout-row">
                <Row className="cart-products">
                    {
                        this.props.cart.length ? this.props.cart.map((product) => {
                            return <Row className='cart-product-card' key={product.id}>
                                <Col lg="1" sm="4" xs="4" className="flex-col">
                                    <img src={product.img} alt="" className='cart-product-img' />
                                </Col>

                                <Col lg="5" sm="8" xs="8" className="flex-col cart-product-name">
                                    {product.name}
                                </Col>

                                <Col lg="3" sm="4" xs="4" className="quantity-col">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <span> <FontAwesomeIcon className='cursor-pointer minus-icon' icon={["fas", "minus"]} onClick={() => { this.props.decrement(product.id) }} /></span>
                                        <span className="mb-1">  {product.quantity}</span>
                                        <span><FontAwesomeIcon className='cursor-pointer plus-icon' icon={["fas", "plus"]} onClick={() => { this.props.increment(product.id) }} /></span>
                                    </div>

                                    <div>
                                        {
                                            product.available < 10 ? <Badge bg="danger" className='product-status'>Only {product.available} left</Badge>
                                                : ""
                                        }
                                    </div>
                                </Col>

                                <Col lg="2" sm="4" xs="4" className="flex-col">
                                    <span>{product.price}</span>
                                </Col>

                                <Col lg="1" sm="4" xs="4" className="flex-col remove-col">
                                    <span><FontAwesomeIcon className='cursor-pointer times-icon' icon={["fas", "times"]}
                                        onClick={() => { this.props.removeFromCart(product) }} /></span>
                                </Col>


                            </Row >


                        }) : <h4 className="text-center">No items in the cart.</h4>
                    }


                    {
                        offers.length ? offers.map((product) => {
                            return <Row className='cart-product-card' key={product.id}>
                                <Col lg="1" sm="4" xs="4" className="flex-col">
                                    <img src={product.img} alt="" className='cart-product-img' />
                                </Col>

                                <Col lg="5" sm="8" xs="8" className="flex-col cart-product-name">
                                    {product.name}
                                </Col>

                                <Col lg="3" sm="4" xs="4" className="quantity-col">
                                    <Badge bg="info" className='product-status'>Free Offer</Badge>
                                </Col>

                                <Col lg="2" sm="4" xs="4" className="flex-col">
                                    <span style={{ textDecoration: "line-through" }}>{product.price}</span>
                                </Col>

                                <Col lg="1" sm="4" xs="4" className="flex-col remove-col">

                                </Col>


                            </Row >


                        }) : ""
                    }

                </Row>


                {
                    subtotal > 0 ? <Row className="checkout">
                        <Table striped bordered hover className="mt-4">
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: "700" }} className="text-center">Subtotal</td>
                                    <td>£{subtotal}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: "700" }} className="text-center">Discount</td>
                                    <td>£{discount}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: "700" }} className="text-center">Total</td>
                                    <td>£{total} <Button variant="success" size="sm" style={{ position: "relative", left: "22%" }}>Checkout</Button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row> : ""
                }



            </Row>

        )
    }
}

export default CheckOut;