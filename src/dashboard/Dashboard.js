import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import {useUser, useCart} from '../lib/customHooks';

const Dashboard = () => {
    const { user, authenticated } = useUser();
    const {cartItems} = useCart();
    const activeStyle = {myaccount : {backgroundColor:'#fe696a',color:'white'}};
    
    return (
        <>
        <Navbar user={user} cart={cartItems} />
        <section className="" style={{marginTop:'80px'}}>
            <div className="container">
                <div className="row">
                    <Sidebar active={activeStyle}/>
                    <div className="col-xl-9 col-lg-9 col-md-8">
                        <p style={{fontSize:'14px'}}>Hello {user.email} <a href="#" className="dashlist-link">Log out</a></p>
                        <p style={{fontSize:'14px'}}>From your account dashboard you can view your <a href="" className="dashlist-link">recent orders</a>, manage your <a href="/address" className="dashlist-link">shipping and billing addresses</a>, and <a href="/edit-account" className="dashlist-link">edit your password and account details.</a></p>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </>
    );
}

export default Dashboard;
