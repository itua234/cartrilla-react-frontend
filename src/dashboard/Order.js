import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Product1 from "../assets/images/product-01.jpg";
import Sidebar from '../components/Sidebar';
import {useUser, useCart} from '../lib/customHooks';
import {API_ROUTES, APP_ROUTES} from '../utils/constants.js';
import {getTokenFromLocalStorage} from '../lib/common';

const Order = () => {
    const navigate = useNavigate();
    const {user} = useUser();
    const {cartItems} = useCart();
    const [orders, setOrders] = useState({});
    const activeStyle = {order : {backgroundColor:'#fe696a',color:'white'}};
    const token = getTokenFromLocalStorage();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.get(API_ROUTES.ORDER, config)
        .then((res) => {
            let data = res.data.results;
            setOrders(data);
        })
    },[]);
    
    return (
        <>
        <Navbar user={user} cart={cartItems} />
        <section className="" style={{marginTop:'80px'}}>
            <div className="container">
                <div className="row">
                    <Sidebar active={activeStyle}/>
                    <div className="col-xl-9 col-lg-9 col-md-8">
                        <ul className="list-unstyled cart_item_container">
                            {
                                Object.keys(orders).length === 0
                                ?
                                <>There are no items in the cart</>
                                :
                                Object.keys(orders).map((key) => (
                                    <li className="list-group-item" key={orders[key]["id"]}>
                                        <div className="row align-items-center">
                                            <div className="col-3">
                                                <a href={"/product-detail/"+orders[key]["id"]}>
                                                    <img src={Product1} alt="..." className="img-fluid" />
                                                </a>
                                            </div>
                                            <div className="col">
            
                                                <div className="d-flex mb-2 font-weight-bold">
                                                    <a className="text-body" href={"/product-detail/"+orders[key]["id"]}> order name</a> <span className="ml-auto"></span>
                                                </div>
                
                                                <p className="mb-7 font-size-sm text-muted">
                                                    Size: M <br></br>
                                                    Color: Red
                                                </p>
                
                                                <div className="d-flex align-items-center">
                
                                                    <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                                        
                                                    </div>
                
                                                    
                                                    <a
                                                    className="font-size-xs text-gray-400 ml-auto js-remove-cart-item" href="#">
                                                        <i className="fe fe-x"></i> Remove
                                                    </a>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))         
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </>
    );
}

export default Order;
