import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import creditCard from "../assets/images/icon/credit-card.svg";
import logout from "../assets/images/icon/logout.svg";
import cart from "../assets/images/icon/shopping-cart.svg";
import dashboard from "../assets/images/icon/dashboard.svg";
import cloud from "../assets/images/icon/cloud-computing.svg";
import user from "../assets/images/icon/User2.svg";
import location from "../assets/images/icon/Location.svg";
import edit from "../assets/images/icon/edit.svg";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddressBox from '../components/AddressBox';
import {API_ROUTES} from '../utils/constants.js';
import {getTokenFromLocalStorage} from '../lib/common';

const Address = () => {
    const [shipping, setShipping] = useState({});
    const [billing, setBilling] = useState({});

    useEffect(() => {
        const token = getTokenFromLocalStorage();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.get(API_ROUTES.GET_SHIPPING_ADDRESS, config)
        .then((res) => {
            let data = res.data.results;
            setShipping(data);
        })
        .catch((err) => {
            alert(err);
        })

        axios.get(API_ROUTES.GET_BILLING_ADDRESS, config)
        .then((res) => {
            let data = res.data.results;
            setBilling(data);
        })
        .catch((err) => {
            alert(err);
        })
    },[]);

    return (
        <>
            <Header />
            <Navbar />
            <section className="" style={{marginTop:'80px', paddingBottom:"40px"}}>
                <div className="container">
                    <div className="row">
                        <ul className="col-xl-3 col-lg-3 col-md-4 list-unstyled">
                            <li ><a href="/myaccount" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={dashboard} />DASHBOARD</a></li>
                            <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={cart} />ORDERS</a></li>
                            <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={cloud} />DOWNLOADS</a></li>
                            <li><a href="/address" className="dashboard-list-link d-flex align-items-center text-decoration-none"  style={{backgroundColor:'#fe696a',color:'white'}}><img alt="" className="w-h-25 m-r-10" src={location} />ADDRESSES</a></li>
                            <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={creditCard} />PAYMENT METHODS</a></li>
                            <li><a href="/edit-account" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={user} />ACCOUNT DETAILS</a></li>
                            <li><a href="/logout" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={logout} />LOGOUT</a></li>
                        </ul>
                        <div className="col-xl-9 col-lg-9 col-md-8">
                            <h4 style={{fontWeight:"bold"}}>My Addresses</h4>
                            <p>The following addresses will be used on the checkout page by default.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 style={{fontWeight:"bold"}}>Billing Address</h5>
                                <p><a href="/address/billing"><img className="w-h-20 m-r-10" src={edit} /><span>Edit</span></a></p>
                            </div>
                            <div style={{fontStyle:"italic"}}>
                                <>
                                    { (billing) ? <AddressBox content={billing} /> :
                                        <i>You have not set up this type of address yet.</i>
                                    }
                                </>
                            </div>
                            <div className="d-flex justify-content-between align-items-center" style={{marginTop:"25px"}}>
                                <h5 style={{fontWeight:"bold"}}>Shipping Address</h5>
                                <p><a href="/address/shipping"><img class="w-h-20 m-r-10" src={edit} /><span>Edit</span></a></p>
                            </div>
                            <div style={{fontStyle:"italic"}}>
                                    <>
                                    { (shipping) ? <AddressBox content={shipping} /> :
                                        <i>You have not set up this type of address yet.</i>
                                    }
                                    </>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Address;
