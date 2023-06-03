import React, {useState} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import creditCard from "../assets/images/icon/credit-card.svg";
import logout from "../assets/images/icon/logout.svg";
import cart from "../assets/images/icon/shopping-cart.svg";
import dashboard from "../assets/images/icon/dashboard.svg";
import cloud from "../assets/images/icon/cloud-computing.svg";
import user from "../assets/images/icon/User2.svg";
import location from "../assets/images/icon/Location.svg";
import {API_ROUTES, APP_ROUTES} from '../utils/constants.js';
import {getTokenFromLocalStorage} from '../lib/common';

const Sidebar = ({active}) => {
    const navigate = useNavigate();
    const token = getTokenFromLocalStorage();

    const Logout = (event) => {
        event.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(API_ROUTES.SIGN_OUT, config)
        .then((res) => {
            let newToken = res.data.results;
            localStorage.removeItem('token');
            localStorage.setItem('isLoggedIn', "false");
            navigate(APP_ROUTES.SIGN_IN);
        });
    }
    
    return (
        <>
            <ul className="col-xl-3 col-lg-3 col-md-4 list-unstyled">
                <li ><a href="/myaccount" className="dashboard-list-link d-flex align-items-center text-decoration-none" style={active.myaccount}><img alt="" className="w-h-25 m-r-10" src={dashboard} />DASHBOARD</a></li>
                <li><a href="/orders" className="dashboard-list-link d-flex align-items-center text-decoration-none" style={active.order}><img alt="" className="w-h-25 m-r-10" src={cart} />ORDERS</a></li>
                <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={cloud} />DOWNLOADS</a></li>
                <li><a href="/address" className="dashboard-list-link d-flex align-items-center text-decoration-none" style={active.address}><img alt="" className="w-h-25 m-r-10" src={location} />ADDRESSES</a></li>
                <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={creditCard} />PAYMENT METHODS</a></li>
                <li><a href="/edit-account" className="dashboard-list-link d-flex align-items-center text-decoration-none" style={active.editAccount}><img alt="" className="w-h-25 m-r-10" src={user} />ACCOUNT DETAILS</a></li>
                <li><a href="#" onClick={Logout} className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={logout} />LOGOUT</a></li>
            </ul>
        </>
    );
}

export default Sidebar;
