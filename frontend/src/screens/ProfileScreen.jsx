import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form,Button,Row,Col,Table} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {getUserDetails,updateUserProfile} from "../actions/userActions"
import {listMyOrders} from "../actions/orderActions"
import { LinkContainer } from 'react-router-bootstrap'
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants"


const ProfileScreen = ({location,history}) => {
const [email,setEmail]=useState("")
const [password,setpassword]=useState("")
const [name,setName]=useState("")
const [confirmPassword,setconfirmPassword]=useState("")
const [message,setMessage]=useState("")




const dispatch=useDispatch()

const userDetails=useSelector(state=>state.userDetails)
const {loading,error,user}=userDetails

const userLogin=useSelector(state=>state.userLogin)
const {userInfo}=userLogin

const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
const {success}=userUpdateProfile


const orderListMy=useSelector((state)=>state.orderListMy)
const {loading:loadingOrder,error:errorOrder,orders}=orderListMy



useEffect(() => {
    if(!userInfo){
        history.push("/login")
    }else{
     if(!user.name||!user||success){
       dispatch({type:USER_UPDATE_PROFILE_RESET})
         dispatch(getUserDetails("profile"))
         dispatch(listMyOrders())
     }else{
        setName(user.name) 
        setEmail(user.email)

     }   
    }
    
}, [history,userInfo,dispatch,user,success])

const submitHandler=(e)=>{
  e.preventDefault()
  if(password!==confirmPassword){
      setMessage("passwords do not match")
  }else{
    dispatch(updateUserProfile({id:user._id,name,email,password}))
  }
  
}
    return (
      <Row>
    <Col md={3}>
    <h2>User Profile</h2>

{message && <Message variant="dark">{message}</Message>}
{error && <Message variant="dark">{error}</Message>}
{success && <Message variant="dark">Profile updated</Message>}

{loading && <Loader />}
        <Form onSubmit={submitHandler}>

        <Form.Group  controlId="name">
 <Form.Label>Name</Form.Label>   
 <Form.Control type="name" placeholder="enter name" value={name}
 onChange={(e)=>setName(e.target.value)}></Form.Control>
</Form.Group>

<Form.Group  controlId="email">
 <Form.Label>Email Address</Form.Label>   
 <Form.Control type="email" placeholder="enter email" value={email}
 onChange={(e)=>setEmail(e.target.value)}></Form.Control>
</Form.Group>


<Form.Group  controlId="password">
 <Form.Label>Password</Form.Label>   
 <Form.Control type="password" placeholder="enter password" value={password}
 onChange={(e)=>setpassword(e.target.value)}></Form.Control>
</Form.Group>

<Form.Group  controlId="confirmPassword">
 <Form.Label>Confirm Password</Form.Label>   
 <Form.Control type="password" placeholder="confirm password" value={confirmPassword}
 onChange={(e)=>setconfirmPassword(e.target.value)}></Form.Control>
</Form.Group>

<Button type="submit" variant="dark">Update</Button>

</Form>



    </Col> 
    <Col md={9}>
<h2>Myorders</h2>
{loadingOrder?<Loader />:errorOrder?<Message variant="danger">{errorOrder}</Message>:(
<Table striped border hover responsive className="table-sm">
<thead>
  <tr>
    <th>ID</th>
    <th>DATE</th>
    <th>TOTAL</th>
    <th>PAID</th>
    <th>DELIVERED</th>
  </tr>
</thead>
<tbody>
  {orders.map(order =>(
    <tr key={order._id}>
    <td>{order._id}</td>
    <td>{order.createdAt.substring(0,10)}</td>
    <td>{order.totalPrice}</td>
    <td>{order.isPaid?order.paidAt.substring(0,10):(
      <i className="fas fa-times" style={{color:"red"}}></i>
    )}</td>
    <td>{order.isDelivered?order.deliveredAt.substring(0,10):(
      <i className="fas fa-times" style={{color:"red"}}></i>
    )}</td>
    <td><LinkContainer to={`/order/${order._id}`}>
      <Button className="btn-sm" variant="light">Details</Button>
    </LinkContainer></td>
    
</tr>
  ))}
</tbody>
</Table>
  )}
    </Col> 

      </Row> 
    )
}

export default ProfileScreen
