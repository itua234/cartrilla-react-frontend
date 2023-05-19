import React, {useState} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import {API_ROUTES, APP_ROUTES} from '../utils/constants.js';
import {getTokenFromLocalStorage} from '../lib/common';

const Logout = () => {
    const navigate = useNavigate();
    alert("Do you want to log out");

    // const token = getTokenFromLocalStorage();
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // };
    // axios.post(API_ROUTES.SIGN_OUT, config)
    // .then((res) => {
    //     localStorage.removeItem('token');
    //     navigate(APP_ROUTES.SIGN_IN);
    // });
}

export default Logout;
