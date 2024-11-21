import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap"
import './App.css';
import HomeScreen from "./screens/HomeScreen"
import RegisterScreen from "./screens/RegisterScreen"
import LoginScreen from "./screens/LoginScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ProductScreen from "./screens/productScreen"
import PaymentScreen from "./screens/PaymentScreen"
import ShippingScreen from "./screens/ShippingScreen"
import CartScreen from "./screens/CartScreen"
import {BrowserRouter as Router,Route} from "react-router-dom";
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import OrderListScreen from "./screens/OrderListScreen"


function App() {
  return (
    <Router className="App">
    <Header />
    <main className="py-3">
<Container>
<Route path="/" component={HomeScreen} exact />
<Route path="/product/:id" component={ProductScreen} />
<Route path="/cart/:id?" component={CartScreen} />
<Route path="/login" component={LoginScreen} />
<Route path="/register" component={RegisterScreen} />
<Route path="/profile" component={ProfileScreen} />
<Route path="/shipping" component={ShippingScreen} />
<Route path="/payment" component={PaymentScreen} />
<Route path="/placeOrder" component={PlaceOrderScreen} />
<Route path="/admin/userlist" component={UserListScreen} />
<Route path="/admin/orderlist" component={OrderListScreen} />
<Route path="/admin/productlist" component={ProductListScreen}  exact/>
<Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
<Route path="/order/:id" component={OrderScreen} />
<Route path="/admin/user/:id/edit" component={UserEditScreen} /> 
<Route path="/admin/product/:id/edit" component={ProductEditScreen} /> 
<Route path="/search/:keyword" component={HomeScreen}  />
<Route path="/page/:pageNumber" component={HomeScreen} exact />
<Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />



</Container>

    </main>
      
      <Footer />
    </Router>
  );
}

export default App;
