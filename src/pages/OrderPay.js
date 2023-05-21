import React, {useState} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser, useCart } from '../lib/customHooks';

const OrderPay = () => {
    const { user } = useUser();
    const {cartItems} = useCart();
    const Dashed = {
        borderBottom:"1px dashed black"
    };

    let payment = JSON.parse(localStorage.getItem('payment'));
    let orderNo = payment['orderNo'];
    let keys = payment['public_key'];
    let email = payment.email;
    let total = payment.total;
    let reference = payment.reference;

    const Pay = (e) => {
        e.preventDefault();
        alert('are you ready to make payment?');

        // axios.post(API_ROUTES.ORDER, data)
        // .then((res) => {
        //     let response = JSON.stringify(res);
        //     alert(response);
        // })
        // .catch((error) => {
        //     let errors = error.response.data.error;

        // });
    }

    const Cancel = (e) => {
        e.preventDefault();
        alert('do you want to cancel?');
    }
    
    return (
        <>
            <Navbar user={user} cart={cartItems} />
            <section className="m-t-80 m-b-30">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-8 col-md-8">
                            <div className="d-flex flex-column p-b-7" style={Dashed}>
                                <span className="fs-13">ORDER NUMBER:</span>
                                <span className="font-weight-bold fs-18">{orderNo}</span>
                            </div>
                            <div className="d-flex flex-column p-t-5 p-b-7" style={Dashed}>
                                <span className="fs-13">DATE:</span>
                                <span className="font-weight-bold fs-18">
                                    04 29, 2023
                                </span>
                            </div>
                            <div className="d-flex flex-column p-t-5 p-b-7" style={Dashed}>
                                <span className="fs-13">TOTAL:</span>
                                <span className="font-weight-bold fs-18">${total}</span>
                            </div>
                            <div className="d-flex flex-column p-t-5 p-b-7" style={Dashed}>
                                <span className="fs-13">PAYMENT METHOD:</span>
                                <span className="font-weight-bold fs-18">Debit/Credit Cards</span>
                            </div>
                            <div className="p-t-30">
                                <p>Thank you for your order, please click on the button below to pay with Paystack.</p>
                                <div className="">
                                    <form id="paymentForm" onSubmit={Pay}>
                                        <div className="form-submit">
                                            <button 
                                            type="submit" 
                                            className="btn btn-outline-primary text-decoration-none"> Pay Now</button>
                                        </div>
                                    </form>
                                    <a href="#" 
                                    onClick={Cancel}
                                    className="btn btn-outline-primary text-decoration-none">Cancel order & restore cart</a> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>		
            <Footer />
        </>
    );
}

export default OrderPay;
