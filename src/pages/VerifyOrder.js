import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import LocationWhite from "../assets/images/icon/Location-white.svg";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {APP_ROUTES, API_ROUTES} from '../utils/constants';
import {getTokenFromLocalStorage} from '../lib/common';

const VerifyOrder = () => {
    let [query] = useSearchParams();
    let reference = query.get('reference');
    const navigate = useNavigate();
    const token = getTokenFromLocalStorage();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.post(API_ROUTES.VERIFY_ORDER+reference, {}, config)
    .then((res) => {
        sessionStorage.setItem('orderIsComplete', "bad guy");
        sessionStorage.setItem('reference', res.data.results.reference);
        alert(reference);
    }).catch((error) => {
    
    });
    
}

export default VerifyOrder;
