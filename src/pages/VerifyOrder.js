import React, {useState} from 'react';
import axios from 'axios'; 
import {useNavigate, useParams} from 'react-router-dom';
import {APP_ROUTES, API_ROUTES} from '../utils/constants';
import {getTokenFromLocalStorage} from '../lib/common';

const VerifyOrder = () => {
    let params = useParams();
    let reference = params.reference;
    const navigate = useNavigate();
    const token = getTokenFromLocalStorage();
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.post(API_ROUTES.VERIFY_ORDER+reference, {}, config)
    .then((res) => {
        sessionStorage.setItem('orderIsComplete', "true");
        return navigate(APP_ROUTES.ORDER_COMPLETE, {
            state: {reference}
        });
    })
}

export default VerifyOrder;
