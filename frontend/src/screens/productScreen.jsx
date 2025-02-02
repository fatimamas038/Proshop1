import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {Row,Col,Image,ListGroup,Card,Button} from "react-bootstrap"
import Form from 'react-bootstrap/Form'
import Rating from "../components/Ratings"
import {listProductDetails,createProductReview} from "../actions/productActions"
import Loader from '../components/Loader'
import Message from '../components/Message'
import {PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS} from "../constants/productCons"

const ProductScreen = ({history,match}) => {
const dispatch=useDispatch()

const productDetails=useSelector(state=>state.productDetails)
const {loading,error,product}=productDetails


const productReviewCreate=useSelector(state=>state.productReviewCreate)
const {success:successProductReview,error:errorProductReview}=productReviewCreate

const userLogin=useSelector(state=>state.userLogin)
const {userInfo}=userLogin


const [qty,setQty]=useState(1);
const [rating,setRating]=useState(0);
const [comment,setComment]=useState("");




useEffect(()=>{
   
   if(successProductReview){
       alert("Review Submitted")
       setRating(0)
       setComment("")
       dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
   }
   
    dispatch(listProductDetails(match.params.id))
    
}, [dispatch,match,successProductReview])


const addtocartHandler=()=>{
  history.push(`/cart/${match.params.id}?qty=${qty}`)   
}


const submitHandler=(e)=>{
e.preventDefault()
dispatch(createProductReview(match.params.id,{rating,comment}))

}




    return (
        <div>
          <Link className="btn btn-light my-3" to="/" >
Go Back
          </Link> 
{loading?<Loader />:error?<Message variant="danger">{error}</Message>:(
<div style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Row >
              <Col md={6} fluid>
<Image src={product.image} alt={product.name} fluid className="img" />
 </Col>
              <Col md={3}>
<ListGroup variant="flush">
  <ListGroup.Item>
      <h3>{product.name}</h3>
  </ListGroup.Item>  
  <ListGroup.Item>
      <Rating value={product.rating} text={`${product.reviews.length} reviews`} />
  </ListGroup.Item>
  <ListGroup.Item>
      price: ${product.price}
  </ListGroup.Item>
  <ListGroup.Item>
      Description: {product.description}
  </ListGroup.Item>
</ListGroup>
              </Col>
              <Col>
                  <Card>
                  <ListGroup> 
                  <ListGroup.Item> 
                         <Row>
                             <Col>
                                Price: 
                             </Col>
                             <Col>
                            {product.price}   
                             </Col>
                              
                         </Row>      
                         </ListGroup.Item> 
                         <ListGroup.Item>
                         <Row>
                             <Col>
                                status: 
                             </Col>
                             <Col>
                            {product.countInStock > 0 ? "In stock":"Out of stock"}   
                             </Col>
                              
                         </Row>
                         </ListGroup.Item>

{product.countInStock>0&&(
  <ListGroup.Item>
      <Row>
       <Col>
           Qty:
       </Col>  
       <Col>
           <Form.Control as="select" value={qty} onChange={(e)=>{setQty(e.target.value)}}>
            { [...Array(product.countInStock).keys()].map((x)=>(
               
             <option key={x+1} value={x+1}>{x+1}</option>
                
             ))}
           </Form.Control>
       </Col> 
      </Row>
  </ListGroup.Item>  
)}

                         <ListGroup.Item>
                             <Button onClick={addtocartHandler} variant="dark" className="btn-block" type="button" disabled={product.countInStock===0}>
                                 Add to cart
                             </Button>
                         </ListGroup.Item>
                         </ListGroup>       
                         </Card> 
              </Col>
          </Row>
<Row>
    <Col md={6 }>
<h2>REVIEWS</h2>
{product.reviews.length===0 &&<Message>No reviews</Message>}
<ListGroup variant="flush">
{product.reviews.map((review)=>(
    <ListGroup.Item key={review._id}>
<strong>{review.name}</strong>
<Rating value={review.rating} />
<p>{review.createdAt.substring(0,10)}</p>
<p>{review.comment}</p>
    </ListGroup.Item>  
))}
 <ListGroup.Item>
 {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
  <h2>Write a customer review</h2>
  {userInfo?(
   <Form onSubmit={submitHandler}>
   <Form.Group controlId="rating"  >
   <Form.Label>Rating</Form.Label> 
   <Form.Control as="select" value={rating} onChange={(e)=>{setRating(e.target.value)}}>
       <option value="">Select...</option>
       <option value="1">1--poor</option>
       <option value="2">2--Fair</option>
       <option value="3">3--Good</option>
       <option value="4">4--Very Good</option>
       <option value="5">5--Excellent</option>
 </Form.Control>   
   </Form.Group>  
   <Form.Group controlId="comment">
<Form.Label>Comment</Form.Label>
<Form.Control as="textarea" row="3" value={comment}
onChange={(e)=>setComment(e.target.value)}></Form.Control>
   </Form.Group>
   <Button type="submit" variant="dark">Submit</Button>
   </Form>  
  ):<Message>Please <Link to="/login" />Sign in to write a review</Message>}   
 </ListGroup.Item> 
</ListGroup>
    </Col>
</Row>
</div>
)}
          
          
          
        </div>
    )
}

export default ProductScreen
