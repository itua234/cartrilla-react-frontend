import React, {useState} from 'react';
import axios from 'axios'; 
import {BrowserRouter, Route, Routes, Navigate, Redirect} from 'react-router-dom';
//import {Redirect, Route} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useUser} from '../lib/customHooks';

const ProtectedRoute = ({component: Component, ...restOfProps}) => {
    const { user, authenticated } = useUser();
    const navigate = useNavigate();

    // return (
    //     <Route {...restOfProps}
    //     render={(props) => 
    //          authenticated ? <Component {...props} /> : <Redirect to="/login" />
    //     }
    //     />
    // )
}

export default ProtectedRoute;
