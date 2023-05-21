import React, {useState} from 'react';
import axios from 'axios'; 
import {Outlet, Navigate} from 'react-router-dom';
import {getTokenFromLocalStorage} from '../lib/common';
import {API_ROUTES} from '../utils/constants';

const ProtectedRoute = ({component: Component, ...restOfProps}) => {
    const authenticated = localStorage.getItem('isLoggedIn');

    return (
        authenticated ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoute;
