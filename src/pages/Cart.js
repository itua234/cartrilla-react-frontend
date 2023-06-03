import React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import Product1 from "../assets/images/product-01.jpg";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import serialize from 'form-serialize';
import { useUser } from '../lib/customHooks';

const Cart = () => {
    const { user } = useUser();
    var [cart, setCart] = useState({});
    const [calculation, setCalculation] = useState({});
    const [inputs, setInputs] = useState({});
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});
    var [isUpdated, setUpdated] = useState(false);

    useEffect(() => {
        var items = JSON.parse(localStorage.getItem('cart'));
        var sum = 0;
        var total = {};
        var tax = 550;
        if(Object.is(items, null)){
            items = {};
            total = {
                "subtotal": sum,
                "tax": tax,
                "total": sum + tax
            }
        }
        if(Object.keys(items) !== 0){
            Object.keys(items).map(key => {
                sum += items[key]["total"];
            })
            total = {
                "subtotal": sum,
                "tax": tax,
                "total": sum + tax
            }
        }else{
            total = {
                "subtotal": 0,
                "tax": tax,
                "total": 0
            }
        }
        setCart(items);
        setCalculation(total);
    },[isUpdated]);

    const increaseQuantity = (item) => {
        item["quantity"] += 1;
        setCart(values => ({
            ...values, 
            [item["uuid"]]: {
                ...values[item["uuid"]],
                "quantity": item["quantity"],
                "total": item["quantity"] * item["price"] 
            }
        }));
    }

    const decreaseQuantity = (item) => {
        if(item["quantity"] > 1){
            item["quantity"] -= 1;
        }
        setCart(values => ({
            ...values, 
            [item["uuid"]]: {
                ...values[item["uuid"]],
                "quantity": item["quantity"],
                "total": item["quantity"] * item["price"] 
            }
        }));
    }

    const deleteItem = (event, item) => {
        event.preventDefault();
        
        let newCart = Object.keys(cart).filter((key) => key !== item["uuid"]).reduce((cur, key) => {
            return Object.assign(cur, {[key]: cart[key]})
        }, {});

        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setUpdated(!isUpdated);
    }

    const handleInputs = (event) => {
        const {name, value} = event.target;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleErrors = (error, input) => {
        setErrors(values => ({...values, [input]: error}));
    }

    const UpdateCart = (e) => {
        e.preventDefault();
        // const form = e.currentTarget
        // const body = serialize(form, {hash:true})
        localStorage.setItem('cart', JSON.stringify(cart));
        setUpdated(!isUpdated);
    }

    const ApplyCoupon = (e) => {
        e.preventDefault();
        alert(inputs.coupon);
    }

    const Checkout = (e) => {
        e.preventDefault();
        alert('you want to checkout?');
    }

    return (
        <>
        <Navbar user={user} cart={cart} />
        <section className="m-t-100 m-b-30">
        <form className="cart-form" onSubmit={UpdateCart}>
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-md-7 col-sm-12">
                        <ul className="list-unstyled cart_item_container">
                            {
                                Object.keys(cart).length === 0
                                ?
                                <>There are no items in the cart</>
                                :
                                Object.keys(cart).map((key) => (
                                    <li className="list-group-item" key={cart[key]}>
                                        <div className="row align-items-center">
                                            <div className="col-3">
                                                <a href={"/product-detail/"+cart[key]["uuid"]}>
                                                    <img src={Product1} alt="..." className="img-fluid" />
                                                </a>
                                            </div>
                                            <div className="col">
            
                                                <div className="d-flex mb-2 font-weight-bold">
                                                    <a className="text-body" href={"/product-detail/"+cart[key]["uuid"]}> {cart[key]["name"]}</a> <span className="ml-auto">${cart[key]["price"]}</span>
                                                </div>
                
                                                <p className="mb-7 font-size-sm text-muted">
                                                    Size: M <br></br>
                                                    Color: Red
                                                </p>
                
                                                <div className="d-flex align-items-center">
                
                                                    <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                                        <div onClick={() => decreaseQuantity(cart[key])}
                                                        className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                            <i className="fs-16 zmdi zmdi-minus"></i>
                                                        </div>
                
                                                        <input 
                                                        className="mtext-104 cl3 txt-center num-product" 
                                                        type="number"
                                                        name={cart[key]["uuid"]}
                                                        value={cart[key]["quantity"]} />

                                                        <div onClick={() => increaseQuantity(cart[key])}
                                                        className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                                            <i className="fs-16 zmdi zmdi-plus"></i>
                                                        </div>
                                                    </div>
                
                                                    
                                                    <a onClick={(event) => deleteItem(event, cart[key])}
                                                    className="font-size-xs text-gray-400 ml-auto js-remove-cart-item" href="#">
                                                        <i className="fe fe-x"></i> Remove
                                                    </a>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))         
                            }
                        </ul>
                        <label for="coupon_code" >Coupon code:</label>
                        <div className="row justify-content-between">
                            <div className="col-12 col-md-7 col-sm-12 col-xl-8 col-lg-8">
                                <div className="row">
                                    <div className="col-8 col-md-6 col-xl-8 col-lg-8">
                                        <input type="text" 
                                        id="coupon_code" 
                                        className="form-control form-control-border"
                                        value={inputs.coupon} 
                                        onChange={handleInputs}
                                        name="coupon" 
                                        placeholder="Enter coupon code*" />
                                    </div>
                                    <div className="col-4 col-md-6 col-xl-3 col-lg-4">
                                        <button 
                                        type="button" 
                                        onClick={ApplyCoupon}
                                        className="w-full btn btn-primary" 
                                        name="coupon_btn">Apply</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 col-md-4 col-sm-3 col-xl-3 col-lg-3">
                                <button 
                                type="submit"
                                className="btn w-full btn-outline-primary update-cart" 
                                name="">Update Cart</button>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div style={{backgroundColor:'#f5f5f5',padding:'25px',paddingBottom:'40px'}}>
                            <ul className="list-unstyled">
                                <li style={{borderBottom:'1px solid rgba(0, 0, 0, 0.125)'}} className="p-b-15 d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span>${calculation["subtotal"]}</span>
                                </li>
                                <li style={{borderBottom:'1px solid rgba(0, 0, 0, 0.125)'}} className="p-t-15 p-b-15 d-flex justify-content-between">
                                    <span>Delivery Cost</span>
                                    <span>${calculation["tax"]}</span>
                                </li>
                                <li style={{borderBottom:'1px solid rgba(0, 0, 0, 0.125)'}} className="font-weight-bold p-t-15 p-b-15 d-flex justify-content-between">
                                    <span>Total</span>
                                    <span className="cart_item_price">
                                        ${calculation["total"]}
                                    </span>
                                </li>
                            </ul>
                            <span>Shipping cost calculated at Checkout</span>
                        </div>
                        <div className="p-t-30">
                            <a href="#" onClick={Checkout}
                            className="btn w-full btn-primary text-decoration-none">Proceed to Checkout</a>
                        </div>
                    </div>
                </div>

                
            </div>
        </form>
        <div className="form-animation justify-content-center align-items-center pos-fixed">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
    </section>
    <Footer />
    </>
    );
}

export default Cart;
