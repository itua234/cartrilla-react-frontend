import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import "../assets/css/util.css";
import "../assets/css/bootstrap.css";
import "../assets/css/main-app.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import {API_ROUTES, APP_ROUTES} from '../utils/constants.js';
import {getTokenFromLocalStorage} from '../lib/common';
import {useUser, useCart} from '../lib/customHooks';
import Collapse from "react-bootstrap/Collapse";

const Checkout = () => {
    const {user} = useUser();
    const {cartItems} = useCart();
    const [coupon, setCoupon] = useState("");
    var [states, setStates] = useState([]);
    var [cities, setCities] = useState([]);
    //var [shipping, setShipping] = useState({});
    var [billing, setBilling] = useState({});
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});
    const [openCoupon, setOpenCoupon] = useState(false);
    const [openBilling, setOpenBilling] = useState(false);
    const [isLoading, setLoading] = useState({display: "none"});

    useEffect(() => {
        axios.get(API_ROUTES.GET_STATES)
        .then((res) => {
            let data = res.data.results;
            setStates(data);
        });
    },[]);

    const applyCoupon = (event) => {
        event.preventDefault();
        alert('you want to use coupon?');
    }

    const handleCities = (value) => setCities(value);

    const handleBillingSelect = (event) => {
        const {name, value} = event.target;
        setBilling(values => ({...values, [name]: value}));
        states.forEach((state) => {
            if(state.name === value){
                handleCities(state.lgas);
            }
        });
    }
    
    const handleBilling = (event) => {
        const {name, value} = event.target;
        setBilling(values => ({...values, [name]: value}));
    }

    const handleErrors = (error, input) => {
        setErrors(values => ({...values, [input]: error}));
    }

    const getTotal = (cart) => {
        var subtotal = 0;
        cart.forEach(item => {
            subtotal += item.total;
        });
        let shipping_cost = 550;
        let total = subtotal + shipping_cost;
        return {subtotal, total, shipping_cost};
    }

    const checkout = (e) => {
        e.preventDefault();
        setLoading({display: "flex"});
        let cart = Object.values(cartItems);
        const {subtotal, total, shipping_cost} = getTotal(cart);
        let inputs = {
            firstname: billing.firstname,
            lastname: billing.lastname,
            email: billing.email,
            phone: billing.phone,
            city: billing.city,
            state: billing.state,
            street: billing.street,
            cart,
            total,
            subtotal,
            shipping_cost
        };

        const token = getTokenFromLocalStorage();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.post(API_ROUTES.ORDER, inputs, config)
        .then((res) => {
            setLoading({display: "none"});
            let data = res.data.results;
            let order = {
                'email': data.detail.email,
                'phone': data.detail.phone,
                'name': data.detail.firstname + data.detail.lastname,
                'order_no': data.order.order_no,
                'reference': data.order.reference,
                'total': data.order.total
            }
            sessionStorage.setItem('order', JSON.stringify(order));
            return navigate(APP_ROUTES.ORDER_PAY);
        }).catch((error) => {
            setErrors({});
            setLoading({display: "none"});
            let errors = error.response.data.error;
            if(errors.firstname){
                handleErrors(errors.firstname, 'firstname');
            }
            if(errors.lastname){
                handleErrors(errors.lastname, 'lastname');
            }
            if(errors.email){
                handleErrors(errors.email, 'email');
            }
            if(errors.phone){
                handleErrors(errors.phone, 'phone');
            }
            if(errors.street){
                handleErrors(errors.street, 'street');
            }
            if(errors.state){
                handleErrors(errors.state, 'state');
            }
            if(errors.city){
                handleErrors(errors.city, 'city');
            }
        })
    }

    return (
        <>
        {
            Object.keys(cartItems).length === 0
            ?
            navigate(APP_ROUTES.CART)
            :
            <>
            <Navbar user={user} cart={cartItems} />
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
                                <span className="error">{errors.firstname}</span>
                            </div>
                            <div className="col">
                                <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Last name <span style={{color:"red"}}>*</span></label>
                                <input 
                                type="text" 
                                value={billing.lastname}
                                name="lastname"
                                onChange={handleBilling} 
                                className="form-control form-control-border" />
                                <span className="error">{errors.lastname}</span>
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
                                <span className="error">{errors.phone}</span>
                            </div>
                            <div className="col">
                                <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Email address <span style={{color:'red'}}>*</span></label>
                                <input 
                                type="email" 
                                value={billing.email}
                                name="email"
                                onChange={handleBilling} 
                                className="form-control form-control-border" />
                                <span className="error">{errors.email}</span>
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
                                <span className="error">{errors.street}</span>
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
                                <span className="error">{errors.state}</span>
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
                                <span className="error">{errors.city}</span>
                            </div>
                        </div>
                    </div>
                    <div className="container">   
                        <div className="row p-t-15 flex-column">
                            <div className="col">
                                <span style={{fontSize:"12px",fontStyle:"italic"}}>Your personal data will be used to process your order, support your experiences throughout this website, and for other purposes described in our privacy policy.</span>
                            </div>
                            <div className="col d-flex align-items-center justify-content-center">
                                <div className="d-flex justify-content-end m-t-20 pos-relative">
                                    <input type="submit" className="w-100 m-t-20 btn btn-primary rounded-all" value="Place Order" />
                                    <Loader display={isLoading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <Footer />
            </>
        }
        </>
    );
}

export default Checkout;
