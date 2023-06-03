import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser, useCart } from '../lib/customHooks';
import { APP_ROUTES } from '../utils/constants';
import { PaystackButton } from "react-paystack";

const OrderPay = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { cartItems } = useCart();
    const Dashed = {
        borderBottom: "1px dashed black"
    };

    let order = JSON.parse(sessionStorage.getItem('order'));
    let orderNo = order.order_no;
    let total = order.total;
    let reference = order.reference;

    const publicKey = "pk_test_dcebfce002c3f0f29374316e9a37c6e5fab9736d"
    const amount = total * 100 // Remember, set in kobo!
    const [email, setEmail] = useState(order.email)
    const [name, setName] = useState(order.name)
    const [phone, setPhone] = useState(order.phone)
    const componentProps = {
        email,
        amount,
        metadata: {
            name,
            phone,
        },
        publicKey,
        text: "Pay Now",
        reference,
        onSuccess: ({ reference }) =>
            navigate(APP_ROUTES.VERIFY_ORDER + reference)
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
                                    <PaystackButton className="btn btn-outline-primary text-decoration-none"
                                        {...componentProps} />
                                    <a href="#"
                                        onClick={Cancel}
                                        className="btn btn-outline-primary text-decoration-none m-l-4">Cancel order & restore cart
                                    </a>
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
