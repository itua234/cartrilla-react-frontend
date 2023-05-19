import React, {useState} from 'react';
import axios from 'axios'; 
import {useNavigate, useParams} from 'react-router-dom';
import LocationWhite from "../assets/images/icon/Location-white.svg";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser, useCart } from '../lib/customHooks';

const OrderComplete = () => {
    let { reference } = useParams();
    const { user } = useUser();
    const {cartItems} = useCart();
    // axios.get(API_ROUTES.VERIFY_ORDER_REFERENCE, {reference})
    // .then((res) => {
    //     let response = JSON.stringify(res);
    //     alert(response);
    // })
    // .catch((error) => {
    //     let errors = error.response.data.error;

    // });
    return (
        <>
            <Navbar user={user} cart={cartItems} />
            <section className="m-t-80 m-b-30">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-8 col-md-8 text-center">
                            <p className='font-weight-bold fs-18'>Thank you for your order!</p>
                            <p>Your order has been placed and will be processed as soon as possible.</p>
                            <p>Make sure you make note of your order number, which is <span className="font-weight-bold">{reference}</span></p>
                            <p>You will be receiving an email shortly with confirmation of your order. You can now:</p>
                            <p><a href="#" className="btn btn-outline-primary text-decoration-none">Go back shopping</a></p>
                            <p><a href="#" className="btn btn-primary text-decoration-none"><img className="w-h-20 m-r-10" src={LocationWhite} />Track order</a></p>
                        </div>
                    </div>
                </div>
            </section>	
            <Footer />
        </>
    );
}

export default OrderComplete;
