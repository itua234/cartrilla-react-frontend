import {API_ROUTES} from '../utils/constants.js';
import axios from 'axios';

export function storeTokenInLocalStorage(token){
    localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage(){
    return localStorage.getItem('token');
}

export async function getAuthenticatedUser(){
    const token = getTokenFromLocalStorage();
    if(!token){
        return { authenticated: false, user: {} };
    }else{
        const response = await axios({
            method: 'GET',
            url: API_ROUTES.GET_USER,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        let data = response.data;
        return {authenticated: true, user: data};
    }
    
}

 // let product_name = "Esprit Ruffle Shirt";
    // let product_id = 1;
    // let price = 400;
    // let quantity = 2;
    // let image = "product-01.jpg";
    // let key = "a"+ product_id;
    // const cart = {
    //     key: {
    //         'name' : product_name,
    //         'product_id' : product_id,
    //         'price' : price,
    //         'quantity' : quantity,
    //         'image' : image,
    //         'total' : price * quantity
    //     }
    // };
    // const paymen = {
    //     'reference' : 'ou83YGy0QNtMPW',
    //     'email' : 'ituaosemeilu234@gmail.com',
    //     'orderNo' : 4567,
    //     'public_key' : "pk_test_6f455aced231a01895f203605546f1ac47664de1",
    //     'total' : price * quantity + 600
    // };
    // localStorage.setItem('cart', JSON.stringify(cart));
    // localStorage.setItem('payment', JSON.stringify(paymen));