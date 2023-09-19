import React from 'react';
import "./product-card.css"

const ProductCard = (props) => {
    return (
        <div>
            {props.name}
        </div>
    );
}

export default ProductCard;