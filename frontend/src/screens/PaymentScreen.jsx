import React,{useState} from 'react'
import {Form,Button,Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import FormContainer from "../components/FormContainer"
import {savePaymentMethod} from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"


const PaymentScreen = ({history}) => {
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    
if(!shippingAddress){
    history.push("/shipping")
}

        const [paymentMethod,setPaymentMethod]=useState("")
       
    
    const dispatch = useDispatch()
    
        const submitHandler=(e)=>{
            e.preventDefault()
            dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeOrder")
    
        }
    
        return (
            <div>
    <CheckoutSteps step1 step2 step3 />
     <FormContainer>
            
         <h1>Payment Method</h1>
         <Form onSubmit={submitHandler}>


         <Form.Group>
     <Form.Label as="legend">Select Method</Form.Label>   
      <Col>
        <Form.Check type="radio" label="paypal or credit card" id="paypal"
        name="paymentMethod" value="paypal" 
        onChange={(e)=>{setPaymentMethod(e.target.value)}} >
        </Form.Check>
    </Col>
    </Form.Group>
    
    
    <Button type="submit" variant="dark">Continue</Button>
    </Form>
            </FormContainer>
    
            </div>
           
        )
}

export default PaymentScreen
