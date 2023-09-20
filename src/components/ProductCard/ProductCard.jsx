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
                <img src={props.product.img} alt="" className='product-img' />
            </Col>
            <Col lg="6" sm="6" xs="12" className='product-body'>
                <div className='product-name'>
                    {props.product.name}
                </div>

                <div className='product-description'>
                    {props.product.description}
                </div>

                <div>
                    {
                        props.product.available >= 10 ? <Badge bg="success" className='product-status'>Available</Badge>
                            : <Badge bg="danger" className='product-status'>Only {props.product.available} left</Badge>
                    }
                </div>

                <div className='product-footer'>
                    <span>
                        {props.product.price}
                    </span>

                    <span>
                        {
                            props.addedToCart ? <FontAwesomeIcon className='cursor-pointer' icon={["fas", "cart-shopping"]} style={{ paddingRight: "1.5em" }}
                                onClick={() => { props.toggleCart(props.product) }} /> :
                                <FontAwesomeIcon className='cursor-pointer' icon={["fas", "cart-arrow-down"]} style={{ paddingRight: "1.5em" }}
                                    onClick={() => { props.toggleCart(props.product) }} />
                        }

                        {
                            props.favorite ? <FontAwesomeIcon className='cursor-pointer favorite' icon={["fas", "heart"]}
                                onClick={() => { props.toggleFavoriteProduct(props.product.id) }} /> :
                                <FontAwesomeIcon className='cursor-pointer' icon={["far", "heart"]}
                                    onClick={() => { props.toggleFavoriteProduct(props.product.id) }} />
                        }
                    </span>

                </div>
            </Col>
        </Row >


    );
}

export default ProductCard;