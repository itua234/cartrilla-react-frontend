import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {getTokenFromLocalStorage} from './common';
import {APP_ROUTES, API_ROUTES} from '../utils/constants';

export function useUser() {
    const [user, setUser]  = useState({});
    const [authenticated, setAuthenticated] = useState(false);
    const token = getTokenFromLocalStorage();

    useEffect(() => {
        async function getUserDetails(){
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.get(API_ROUTES.GET_USER, config)
            .then((res) => {
                setUser(res.data);
                setAuthenticated(true);
            }).catch((error) => {
                setUser({});
                setAuthenticated(false);
            });
        }
        getUserDetails();
    },[]);

    return { user, authenticated};
}

export function useCart(items) {
    const [cartItems, setCart] = useState({});
    var deflt;
    useEffect(() => {
        var item = JSON.parse(localStorage.getItem('cart'));
        // if(Object.keys(items).length  === 0){
        //     deflt = {}
        // }else{
        //     deflt = items;
        // }
        setCart(item);
    },[items]);

    return { cartItems };
}