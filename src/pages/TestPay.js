import React, {useState} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser, useCart } from '../lib/customHooks';
import {PaystackButton} from "react-paystack";

const TestPay = () => {
    const { user } = useUser();
    const {cartItems} = useCart();

    const publicKey = "pk_test_dcebfce002c3f0f29374316e9a37c6e5fab9736d"
    const amount = 1000000 // Remember, set in kobo!
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const componentProps = {
        email,
        amount,
        metadata: {
          name,
          phone,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: ({ reference }) =>
          alert(
            `Thanks for doing business with us! Come back soon!! ${reference}`
        ),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
    }

    return (
        <>
            <Navbar user={user} cart={cartItems} />
            <section className="m-t-80 m-b-30">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-8 col-md-8">
                            
                        </div>
                    </div>
                </div>

                <div className="checkout-form">
                    <div className="checkout-field">
                        <label>Name</label>
                        <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="checkout-field">
                        <label>Email</label>
                        <input
                        type="text"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="checkout-field">
                        <label>Phone</label>
                        <input
                        type="text"
                        id="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <PaystackButton className="btn btn-outline-primary text-decoration-none" 
                    {...componentProps} />
                </div>
            </section>		
            <Footer />
        </>
    );
}

export default TestPay;
