import { Component } from "react";
import "./checkout.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {

        return (

            <Row className="checkout-row">
                <Row className="cart-products">
                    {
                        this.props.cart.length ? this.props.cart.map((product) => {
                            return <Row className='cart-product-card' key={product.id}>
                                <Col lg="2" sm="2" xs="6" className="flex-col">
                                    <img src={product.img} alt="" className='cart-product-img' />
                                </Col>

                                <Col lg="4" sm="4" xs="6">

                                </Col>

                                <Col lg="3" sm="3" xs="4">

                                </Col>

                                <Col lg="2" sm="2" xs="4">

                                </Col>

                                <Col lg="1" sm="1" xs="4">

                                </Col>


                            </Row >


                        }) : ""
                    }

                </Row>

            </Row>

        )
    }
}

export default CheckOut;