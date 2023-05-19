import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import creditCard from "../assets/images/icon/credit-card.svg";
import logout from "../assets/images/icon/logout.svg";
import cart from "../assets/images/icon/shopping-cart.svg";
import dashboard from "../assets/images/icon/dashboard.svg";
import cloud from "../assets/images/icon/cloud-computing.svg";
import userImg from "../assets/images/icon/User2.svg";
import location from "../assets/images/icon/Location.svg";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {API_ROUTES} from '../utils/constants.js';
import {getTokenFromLocalStorage} from '../lib/common';

const EditBilling = () => {
    var [states, setStates] = useState([]);
    var [cities, setCities] = useState([]);
    var [address, setAddress] = useState({});
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(API_ROUTES.GET_STATES)
        .then((res) => {
            let data = res.data.results;
            setStates(data);
        })
        .catch((err) => {
            alert(err);
        })

        const token = getTokenFromLocalStorage();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(API_ROUTES.GET_BILLING_ADDRESS, config)
        .then((res) => {
            let data = res.data.results;
            setAddress(data);
            setCities([data.city]);
        })
        .catch((err) => {
            alert(err);
        })
    },[]);

    const handleCities = (value) => setCities(value);

    const handleSelect = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        setAddress(values => ({...values, [name]: value}));
        states.forEach((state) => {
            if(state.name === value){
                handleCities(state.lgas);
            }
        });
    }
    
    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAddress(values => ({...values, [name]: value}));
    }

    const handleErrors = (error, input) => {
        setErrors(values => ({...values, [input]: error}));
    }

    const EditProfile = (e) => {
        e.preventDefault();
        alert(JSON.stringify(address));
        // axios.post('http://localhost:8000/api/v1/auth/register', inputs)
        // .then((res) => {
        //     //history.push("/dashboard");
        // }).catch((error) => {
        //     let errors = error.response.data.error;
        //     if(errors.firstname){
        //         handleErrors(errors.firstname, 'firstname');
        //     }else{
        //         handleErrors('', 'firstname');
        //     }

        //     if(errors.lastname){
        //         handleErrors(errors.lastname, 'lastname');
        //     }else{
        //         handleErrors('', 'lastname');
        //     }

        //     if(errors.email){
        //         handleErrors(errors.email, 'email');
        //     }else{
        //         handleErrors('', 'email');
        //     }
        // });
    }
    return (
        <>
            <Header />
            <Navbar />
            <section className="" style={{marginTop:'80px', paddingBottom:"40px"}}>
                <div className="container">
                    <div className="row">
                        <ul className="col-xl-3 col-lg-3 col-md-4 list-unstyled">
                            <li ><a href="/myaccount" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={dashboard} />DASHBOARD</a></li>
                            <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={cart} />ORDERS</a></li>
                            <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={cloud} />DOWNLOADS</a></li>
                            <li><a href="/address" className="dashboard-list-link d-flex align-items-center text-decoration-none"   style={{backgroundColor:'#fe696a',color:'white'}}><img alt="" className="w-h-25 m-r-10" src={location} />ADDRESSES</a></li>
                            <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={creditCard} />PAYMENT METHODS</a></li>
                            <li><a href="/edit-account" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={userImg} />ACCOUNT DETAILS</a></li>
                            <li><a href="/logout" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={logout} />LOGOUT</a></li>
                        </ul>
                        <div className="col-xl-9 col-lg-9 col-md-8">
                            <h4>Billing Addresses</h4>
                            <form onSubmit={EditProfile}>
                                <div class="row">
                                    <div className="col">
                                        <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>First name <span style={{color:"red"}}>*</span></label>
                                        <input 
                                        type="text" 
                                        value={address.firstname}
                                        name="firstname"
                                        onChange={handleInputs} 
                                        className="form-control form-control-border" />
                                        <span className="error">{errors.firstname}</span>
                                    </div>
                                    <div className="col">
                                        <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Last name <span style={{color:"red"}}>*</span></label>
                                        <input 
                                        type="text" 
                                        value={address.lastname}
                                        name="lastname"
                                        onChange={handleInputs} 
                                        className="form-control form-control-border" />
                                        <span className="error">{errors.lastname}</span>
                                    </div>
                                </div>

                                <div className="d-flex flex-column" style={{marginTop:"20px"}}>
                                    <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Street Address <span style={{color:'red'}}>*</span> </label>
                                    <input 
                                    type="text" 
                                    value={address.street}
                                    name="street"
                                    onChange={handleInputs} 
                                    className="form-control form-control-border" />
                                    <span className="error">{errors.street}</span>
                                </div>

                                <div class="row" style={{marginTop:"20px"}}>
                                    <div className="col">
                                        <label for="">Phone <span style={{color:'red'}}>*</span></label>
                                        <input 
                                        type="text" 
                                        value={address.phone}
                                        name="phone"
                                        onChange={handleInputs} 
                                        className="form-control form-control-border" />
                                        <span className="error">{errors.phone}</span>
                                    </div>
                                    <div className="col">
                                        <label for="">Email address <span style={{color:'red'}}>*</span></label>
                                        <input 
                                        type="email" 
                                        value={address.email}
                                        name="email"
                                        onChange={handleInputs} 
                                        className="form-control form-control-border" />
                                        <span className="error">{errors.email}</span>
                                    </div>
                                </div>

                                <div class="row" style={{marginTop:"20px"}}>
                                    <div className="col">
                                        <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>State <span style={{color:"red"}}>*</span></label>
                                        <select 
                                        name="state"
                                        value={address.state}
                                        onChange={handleSelect} 
                                        className="form-control form-control-border" >
                                            {
                                                states.map((state) => (
                                                    <option value={state.name}>{state.name}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="error">{errors.state}</span>
                                    </div>
                                    <div className="col">
                                        <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Town/City <span style={{color:"red"}}>*</span></label>
                                        <select 
                                        name="city"
                                        value={address.city}
                                        onChange={handleInputs} 
                                        className="form-control form-control-border" >
                                            {
                                                cities.map((city) => (
                                                    <option value={city}>{city}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="error">{errors.city}</span>
                                    </div>
                                </div>

                                <div style={{marginTop:"40px"}}>
                                    <button 
                                    type="submit" 
                                    className="btn btn-primary">
                                        SAVE ADDRESS
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default EditBilling;
