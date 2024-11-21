import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import Product from "../components/Pro"
import {Row,Col} from "react-bootstrap";
import { listProducts } from '../actions/productActions';
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import {Link} from "react-router-dom"
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = ({match}) => {
  const keyword=match.params.keyword
  const pageNumber=match.params.pageNumber||1

const dispatch=useDispatch()
const productList=useSelector(state=>state.productList)
const {loading,error,products,page,pages}=productList
console.log(products);

    useEffect(()=>{
        
dispatch(listProducts(keyword,pageNumber))
     
    }, [dispatch,keyword,pageNumber]) 

    return (
        <div>
        {!keyword ? <ProductCarousel />:<Link to="/" className="btn btn-light">Go Back</Link>}
        <h1>Latest products</h1>
        {loading?<Loader />:error?<Message  variant="danger">{error}</Message>:(
        <>
          <Row>
            
            {products.map((product)=>(
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
              </Col>  
            ))}
         </Row>
         <Paginate pages={pages} page={page} keyword={keyword?keyword:""}></Paginate>
         </>)
        
        }
        
            
        </div>
    )
}

export default HomeScreen
