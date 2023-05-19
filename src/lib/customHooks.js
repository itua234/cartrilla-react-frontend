import React, {useState, useEffect} from 'react';
import {getAuthenticatedUser} from './common';

export function useUser() {
    const [user, setUser]  = useState({});
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function getUserDetails(){
            const { authenticated, user } = await getAuthenticatedUser();
            setUser(user);
            setAuthenticated(authenticated);
        }
        getUserDetails();
    },[]);

    return { user, authenticated};
}

export function useCart(items) {
    const [cartItems, setCart] = useState({});
    var deflt;
    useEffect(() => {
        var items = JSON.parse(localStorage.getItem('cart'));
        if(Object.keys(items).length  === 0){
            deflt = {}
        }else{
            deflt = items;
        }
        setCart(deflt);
    },[items]);

    return { cartItems };
}