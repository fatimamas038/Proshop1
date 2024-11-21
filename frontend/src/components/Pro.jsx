import React from 'react'
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import Rating from "./Ratings"

const Pro = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded" style={{height:"34rem"}} xs={12}>
           <Link to={`/product/${product._id}`}>
               <Card.Img src={product.image} variant="top" style={{height:"18rem",}} fluid/> 
           </Link>

           <Card.Body>

           <Link to={`/product/${product._id}`} className="links">
               <Card.Title as="div" fluid>
               <strong>{product.name}</strong>
                </Card.Title>
           </Link> 

           <Card.Text as="div" fluid>
        <Rating value={product.rating} text={`${product.reviews.length} reviews`}  />
           </Card.Text>  
           <Card.Text as="h3" fluid>
<h3>${product.price}</h3>
           </Card.Text> 
           </Card.Body>
        </Card>
    )
}

export default Pro
