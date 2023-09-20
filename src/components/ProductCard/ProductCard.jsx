import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./product-card.css"

const ProductCard = (props) => {
    return (

        <Row className='product-card'>
            <Col lg="6" sm="6" xs="12" className='product-img-col'>
                <img src={props.img} alt="" className='product-img' />
            </Col>
            <Col lg="6" sm="6" xs="12" className='product-body'>
                <div className='product-name'>
                    {props.name}
                </div>

                <div className='product-description'>
                    {props.description}
                </div>

                <div>
                    <Badge bg="success" className='product-status'>Available</Badge>
                </div>

                <div className='product-footer'>
                    <span>
                        {props.price}
                    </span>

                    <span>
                        <FontAwesomeIcon icon={["fas", "cart-arrow-down"]} style={{ paddingRight: "1.5em" }} />
                        <FontAwesomeIcon icon={["far", "heart"]} />
                    </span>

                </div>
            </Col>
        </Row >


    );
}

export default ProductCard;