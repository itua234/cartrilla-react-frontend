import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {API_ROUTES} from '../utils/constants.js';
import {getTokenFromLocalStorage} from '../lib/common';
import Collapse from "react-bootstrap/Collapse";

const Checkout = () => {
    const [coupon, setCoupon] = useState("");
    var [states, setStates] = useState([]);
    var [cities, setCities] = useState([]);
    var [shipping, setShipping] = useState({});
    var [billing, setBilling] = useState({});
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({
        billing: {},
        shipping: {}
    });
    const [openCoupon, setOpenCoupon] = useState(false);
    const [openBilling, setOpenBilling] = useState(false);

    useEffect(() => {
        axios.get(API_ROUTES.GET_STATES)
        .then((res) => {
            let data = res.data.results;
            setStates(data);
        })
        .catch((err) => {
            alert(err);
        })
    },[]);

    const applyCoupon = (event) => {
        event.preventDefault();
        alert('you want to use coupon?');
    }

    const handleCities = (value) => setCities(value);

    const handleShippingSelect = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        setShipping(values => ({...values, [name]: value}));
        states.forEach((state) => {
            if(state.name === value){
                handleCities(state.lgas);
            }
        });
    }

    const handleBillingSelect = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        setBilling(values => ({...values, [name]: value}));
        states.forEach((state) => {
            if(state.name === value){
                handleCities(state.lgas);
            }
        });
    }
    
    const handleBilling = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setBilling(values => ({...values, [name]: value}));
    }

    const handleShipping = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setShipping(values => ({...values, [name]: value}));
    }

    const handleErrors = (error, input) => {
        setErrors(values => ({...values, [input]: error}));
    }

    const checkout = (e) => {
        e.preventDefault();
        let inputs = {
            billing,
            shipping
        };
        alert(JSON.stringify(inputs));
    }

    return (
        <>
            <Header />
            <Navbar />
            <section className="m-t-80 m-b-40">
                <div className="container">
                    <h5 style={{fontWeight:"bold"}}>Billing Details</h5>
                </div>
                <form onSubmit={applyCoupon}>
                    <div className="container">
                        <p>Have a coupon ? <span className="text-primary text-decoration-none" style={{cursor:"pointer"}}  
                        aria-controls="coupon_collapse" aria-expanded={openCoupon} onClick={() => setOpenCoupon(!openCoupon)}>
                Please apply it below</span></p>
                        <Collapse in={openCoupon}>
                            <div className="row p-b-20" id="coupon_collapse">
                                <div className="col-8">
                                    <input type="text" className="form-control form-control-border" 
                                    name="coupon" 
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    placeholder="Coupon code" />
                                </div>
                                <div className="col-4">
                                    <input type="submit" className="w-full btn btn-primary" 
                                    value="Apply coupon" />
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </form>
                <div className=""></div>
                <form onSubmit={checkout}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>First name <span style={{color:"red"}}>*</span></label>
                                <input 
                                type="text" 
                                value={billing.firstname}
                                name="firstname"
                                onChange={handleBilling} 
                                className="form-control form-control-border" />
                                <span className="error">{errors.billing.firstname}</span>
                            </div>
                            <div className="col">
                                <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Last name <span style={{color:"red"}}>*</span></label>
                                <input 
                                type="text" 
                                value={billing.lastname}
                                name="lastname"
                                onChange={handleBilling} 
                                className="form-control form-control-border" />
                                <span className="error">{errors.billing.lastname}</span>
                            </div>
                        </div>

                        <div className="row p-t-20">
                            <div className="col">
                                <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Phone <span style={{color:'red'}}>*</span></label>
                                <input 
                                type="text" 
                                value={billing.phone}
                                name="phone"
                                onChange={handleBilling} 
                                className="form-control form-control-border" />
                                <span className="error">{errors.billing.phone}</span>
                            </div>
                            <div className="col">
                                <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Email address <span style={{color:'red'}}>*</span></label>
                                <input 
                                type="email" 
                                value={billing.email}
                                name="email"
                                onChange={handleBilling} 
                                className="form-control form-control-border" />
                                <span className="error">{errors.billing.email}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Street Address <span style={{color:'red'}}>*</span> </label>
                                <input 
                                type="text" 
                                value={billing.street}
                                name="street"
                                onChange={handleBilling} 
                                className="form-control form-control-border" />
                                <span className="error">{errors.billing.street}</span>
                            </div>
                        </div>
                        
                        <div className="row p-t-20">
                            <div className="col">
                                <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>State <span style={{color:"red"}}>*</span></label>
                                <select 
                                name="state"
                                value={billing.state}
                                onChange={handleBillingSelect} 
                                className="form-control form-control-border" >
                                    {
                                        states.map((state) => (
                                            <option value={state.name}>{state.name}</option>
                                        ))
                                    }
                                </select>
                                <span className="error">{errors.billing.state}</span>
                            </div>
                            <div className="col">
                                <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Town/City <span style={{color:"red"}}>*</span></label>
                                <select 
                                name="city"
                                value={billing.city}
                                onChange={handleBilling} 
                                className="form-control form-control-border" >
                                    {
                                        cities.map((city) => (
                                            <option value={city}>{city}</option>
                                        ))
                                    }
                                </select>
                                <span className="error">{errors.billing.city}</span>
                            </div>
                        </div>
                    </div>
                    <div className="container">   
                        <div className="row p-t-15">
                            <div className="col">
                                <div className="form-check form-switch" >
                                    <input className="form-check-input" name="shipping-check" type="checkbox" 
                                    aria-controls="shipping_collapse" aria-expanded={openBilling} 
                                    onClick={() => setOpenBilling(!openBilling)} />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Ship to a different address ?</label>
                                </div>
                            </div>
                        </div>
                        <Collapse in={openBilling}>
                        <div className="" id="shipping_collapse">
                            <div className="row">
                                <div className="col">
                                    <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>First name <span style={{color:"red"}}>*</span></label>
                                    <input 
                                    type="text" 
                                    value={shipping.firstname}
                                    name="firstname"
                                    onChange={handleShipping} 
                                    className="form-control form-control-border" />
                                    <span className="error">{errors.shipping.firstname}</span>
                                </div>
                                <div className="col">
                                    <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Last name <span style={{color:"red"}}>*</span></label>
                                    <input 
                                    type="text" 
                                    value={shipping.lastname}
                                    name="lastname"
                                    onChange={handleShipping} 
                                    className="form-control form-control-border" />
                                    <span className="error">{errors.shipping.lastname}</span>
                                </div>
                            </div>

                            <div className="row p-t-20">
                                <div className="col">
                                    <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Phone <span style={{color:'red'}}>*</span></label>
                                    <input 
                                    type="text" 
                                    value={shipping.phone}
                                    name="phone"
                                    onChange={handleShipping} 
                                    className="form-control form-control-border" />
                                    <span className="error">{errors.shipping.phone}</span>
                                </div>
                                <div className="col">
                                    <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Email address <span style={{color:'red'}}>*</span></label>
                                    <input 
                                    type="email" 
                                    value={shipping.email}
                                    name="email"
                                    onChange={handleShipping} 
                                    className="form-control form-control-border" />
                                    <span className="error">{errors.shipping.email}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Street Address <span style={{color:'red'}}>*</span> </label>
                                    <input 
                                    type="text" 
                                    value={shipping.street}
                                    name="street"
                                    onChange={handleShipping} 
                                    className="form-control form-control-border" />
                                    <span className="error">{errors.shipping.street}</span>
                                </div>
                            </div>
                        
                            <div className="row p-t-20">
                                <div className="col">
                                    <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>State <span style={{color:"red"}}>*</span></label>
                                    <select 
                                    name="state"
                                    value={shipping.state}
                                    onChange={handleShippingSelect} 
                                    className="form-control form-control-border" >
                                        {
                                            states.map((state) => (
                                                <option value={state.name}>{state.name}</option>
                                            ))
                                        }
                                    </select>
                                    <span className="error">{errors.shipping.state}</span>
                                </div>
                                <div className="col">
                                    <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Town/City <span style={{color:"red"}}>*</span></label>
                                    <select 
                                    name="city"
                                    value={shipping.city}
                                    onChange={handleShipping} 
                                    className="form-control form-control-border" >
                                        {
                                            cities.map((city) => (
                                                <option value={city}>{city}</option>
                                            ))
                                        }
                                    </select>
                                    <span className="error">{errors.shipping.city}</span>
                                </div>
                            </div>
                        </div>
                        </Collapse>
                        <div className="row p-t-15 flex-column">
                            <div className="col">
                                <span style={{fontSize:"12px",fontStyle:"italic"}}>Your personal data will be used to process your order, support your experiences throughout this website, and for other purposes described in our privacy policy.</span>
                            </div>
                            <div className="col d-flex align-items-center justify-content-center">
                                <div className="">
                                    <input type="submit" className="w-full m-t-20 btn btn-primary" value="Place Order" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <Footer />
        </>
    );
}

export default Checkout;
