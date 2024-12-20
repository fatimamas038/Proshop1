import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {productListReducer,productDetailsReducer, productDeleteReducer,
productCreateReducer,productUpdateReducer,productReviewCreateReducer,
productTopRatedReducer} from "./reducers/productReducers"
import {cartReducer} from "./reducers/cartReducer"
import {userLoginReducer, userRegisterReducer,userDetailsReducer,userUpdateProfileReducer,userListReducer,userDeleteReducer, userUpdateReducer,
} from "./reducers/userReducer"
import {orderCreateReducer,orderDetailsReducer,
    orderListReducer,orderListMyReducer,orderPayReducer,
    orderDeliverReducer
} from "./reducers/orderReducers"

const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    userList:userListReducer,
userDelete:userDeleteReducer,
userUpdate:userUpdateReducer,
productDelete:productDeleteReducer,
productCreate:productCreateReducer,
productUpdate:productUpdateReducer,
orderList:orderListReducer,
orderDeliver:orderDeliverReducer,
productReviewCreate:productReviewCreateReducer,
productTopRated:productTopRatedReducer
})

const cartItemsFromStorage=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
const userInfoFromStorage=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("userInfo")):null
const shippingAddressFromStorage=localStorage.getItem("shippingAddress")?JSON.parse(localStorage.getItem("shippingAddress")):{}


const initialState={
    cart:{cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage},
    userLogin:{userInfo:userInfoFromStorage},
}

const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))



export default store