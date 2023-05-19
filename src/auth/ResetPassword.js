import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "../assets/css/util.css";
import "../assets/css/bootstrap.css";
import "../assets/css/main-app.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart, useUser } from '../lib/customHooks';
import {APP_ROUTES, API_ROUTES} from '../utils/constants';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const {cartItems} = useCart();
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setLoading] = useState({display: "none"});

    const ResetPassword = (e) => {
        e.preventDefault();
        setLoading({display: "flex"});
        
        axios.post(API_ROUTES.RESET_PASSWORD, {email: email})
        .then((res) => {
            setLoading({display: "none"});
            setMsg(res.data.message);
        }).catch((error) => {
            setLoading({display: "none"});
            let errors = error.response.data.error;
            if(errors.email){
                setMsg('If the email address you submitted is valid, you will receive an email.');
            }
        });
    }
    return (
        <>
        <Navbar user={user} cart={cartItems} />
        <section className="m-t-80 m-b-30">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-xl-5 col-md-6 col-sm-7" style={{padding:'20px'}}>
                        <span className="d-block text-success text-center">{msg}</span>
                        <h3 className="text-center" style={{fontWeight:'bolder'}}>Reset Password</h3>
                        <form onSubmit={ResetPassword}>
                            <div className="d-flex flex-column m-t-15">
                                <input 
                                type="email" 
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}  
                                className="form-control form-control-border" />
                            </div>
                            
                            <div className="d-flex justify-content-end m-t-20 pos-relative">
                                <button 
                                type="submit" 
                                className="btn btn-primary rounded-all w-100">
                                    Submit
                                </button>
                                <div className="newsletter-animation pos-absolute rounded-all" style={isLoading}>
                                    <div className="wave"></div>
                                    <div className="wave"></div>
                                    <div className="wave"></div>
                                    <div className="wave"></div>
                                    <div className="wave"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>  
            </div>
        </section>
        <Footer />
        </>
    );
}

export default ResetPassword;
