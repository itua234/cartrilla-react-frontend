import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import {useNavigate, useParams} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Product1 from "../assets/images/product-01.jpg";
import Sidebar from '../components/Sidebar';
import {useUser, useCart} from '../lib/customHooks';
import {API_ROUTES, APP_ROUTES} from '../utils/constants.js';
import {getTokenFromLocalStorage} from '../lib/common';

const OrderDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {user} = useUser();
    const {cartItems} = useCart();
    const [order, setOrder] = useState({});
    const [contents, setContents] = useState([]);
    const activeStyle = {order : {backgroundColor:'#fe696a',color:'white'}};
    const token = getTokenFromLocalStorage();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(API_ROUTES.ORDER+id, config)
        .then((res) => {
            let data = res.data.results;
            setOrder(data);
            setContents(data.contents);
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
                        <div>
                            <h4>Order ID: {order.order_no}</h4>
                            <h6>Order Date: {order.createdAt}</h6>
                        </div>
                        <ul className="list-unstyled cart_item_container">
                            {
                                contents.map((content) => (
                                    <li className="list-group-item" key={content["id"]}>
                                        <div className="row align-items-center">
                                            <div className="col-3">
                                                <a href={"/product-detail/"+content["id"]}>
                                                    <img src={content["product"]["images"][0]["url"]} alt="..." className="img-fluid" />
                                                </a>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex mb-2 font-weight-bold">
                                                    <a className="text-body" href={"/product-detail/"+content["product"]["uuid"]}> {content["product"]["name"]}</a>
                                                     <span className="ml-auto">${content["price"]}</span>
                                                </div>
                                                <div className="d-flex mb-2 font-weight-bold">
                                                    <a className="text-body" href={"/product-detail/"+content["product"]["uuid"]}> </a>
                                                     <span className="ml-auto">Qty: {content["quantity"]}</span>
                                                </div>
                                                <p className="mb-7 font-size-sm text-muted">
                                                    Size: M <br></br>
                                                    Color: Red
                                                </p>
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

export default OrderDetail;