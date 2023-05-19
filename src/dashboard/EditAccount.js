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
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import {API_ROUTES, APP_ROUTES} from '../utils/constants.js';
import {getTokenFromLocalStorage} from '../lib/common';

const EditAccount = () => {
    const [user, setUser] = useState({});
    const [inputs, setInputs] = useState({});
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});
    const token = getTokenFromLocalStorage();
    const activeStyle = {editAccount : {backgroundColor:'#fe696a',color:'white'}};

    // const Logout = (event) => {
    //     event.preventDefault();

    //     const config = {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     };
    //     axios.get(API_ROUTES.SIGN_OUT, config)
    //     .then((res) => {
    //         let newToken = res.data.results;
    //         localStorage.removeItem('token');
    //         setAuthenticated(false);
    //         setUser({});
    //         navigate(APP_ROUTES.SIGN_IN);
    //     });
    // }
    
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(API_ROUTES.GET_USER, config)
        .then((res) => {
            let data = res.data;
            setUser(data);
            setInputs(data);
            var auth;
            if(Object.keys(data).length === 0){
                auth = false;
            }else{
                auth = true;
            }
            setAuthenticated(auth);
        })
    },[]);
    
    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleErrors = (error, input) => {
        setErrors(values => ({...values, [input]: error}));
    }

    const EditProfile = (e) => {
        e.preventDefault();
        let data = {
            email: inputs.email,
            firstname: inputs.firstname,
            lastname: inputs.lastname
        };
        alert(JSON.stringify(data));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.post(API_ROUTES.UPDATE_PROFILE, data, config)
        .then((res) => {
            alert(JSON.stringify(res.data));
            //history.push("/dashboard");
        }).catch((error) => {
            let errors = error.response.data.error;
            if(errors.firstname){
                handleErrors(errors.firstname, 'firstname');
            }else{
                handleErrors('', 'firstname');
            }

            if(errors.lastname){
                handleErrors(errors.lastname, 'lastname');
            }else{
                handleErrors('', 'lastname');
            }

            if(errors.email){
                handleErrors(errors.email, 'email');
            }else{
                handleErrors('', 'email');
            }
        });
    }

    if(authenticated === false){
        navigate(APP_ROUTES.SIGN_IN)
    } else{
        return (
            <>
                <Navbar user={user}/>
                <section className="" style={{marginTop:'80px', paddingBottom:"40px"}}>
                    <div className="container">
                        <div className="row">
                            {/* <ul className="col-xl-3 col-lg-3 col-md-4 list-unstyled">
                                <li ><a href="/myaccount" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={dashboard} />DASHBOARD</a></li>
                                <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={cart} />ORDERS</a></li>
                                <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={cloud} />DOWNLOADS</a></li>
                                <li><a href="/address" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={location} />ADDRESSES</a></li>
                                <li><a href="#" className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={creditCard} />PAYMENT METHODS</a></li>
                                <li><a href="/edit-account" className="dashboard-list-link d-flex align-items-center text-decoration-none"  style={{backgroundColor:'#fe696a',color:'white'}}><img alt="" className="w-h-25 m-r-10" src={userImg} />ACCOUNT DETAILS</a></li>
                                <li><a href="#" onClick={Logout} className="dashboard-list-link d-flex align-items-center text-decoration-none"><img alt="" className="w-h-25 m-r-10" src={logout} />LOGOUT</a></li>
                            </ul> */}
                            <Sidebar active={activeStyle}/>
                            <div className="col-xl-9 col-lg-9 col-md-8">
                                <form onSubmit={EditProfile}>
                                    <div class="row">
                                        <div className="col">
                                            <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>First name <span style={{color:"red"}}>*</span></label>
                                            <input 
                                            type="text" 
                                            value={inputs.firstname}
                                            name="firstname"
                                            onChange={handleInputs} 
                                            className="form-control form-control-border" />
                                            <span className="error">{errors.firstname}</span>
                                        </div>
                                        <div className="col">
                                            <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Last name <span style={{color:"red"}}>*</span></label>
                                            <input 
                                            type="text" 
                                            value={inputs.lastname}
                                            name="lastname"
                                            onChange={handleInputs} 
                                            className="form-control form-control-border" />
                                            <span className="error">{errors.lastname}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column" style={{marginTop:"20px"}}>
                                        <label for="" style={{fontWeight:"bold",fontSize:"14px"}}>Display name <span style={{color:"red"}}>*</span></label>
                                        <input 
                                        type="text" 
                                        value={inputs.displayname}
                                        name="displayname"
                                        onChange={handleInputs} 
                                        className="form-control form-control-border" />
                                    </div>
                                    <p style={{fontStyle:"italic",fontSize:"14px",marginTop:"10px"}}>This will be how your name will be displayed in the account section and in reviews</p>
                                    <div className="d-flex flex-column" style={{marginTop:"15px",fontWeight:"bold",fontSize:"14px"}}>
                                        <label for="">Email address <span style={{color:'red'}}>*</span></label>
                                        <input 
                                        type="email" 
                                        value={inputs.email}
                                        name="email"
                                        onChange={handleInputs} 
                                        className="form-control form-control-border" />
                                        <span className="error">{errors.email}</span>
                                    </div>
                                    <div style={{marginTop:"40px"}}>
                                        <button 
                                        type="submit" 
                                        className="btn btn-primary">
                                            SAVE CHANGES
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
}

export default EditAccount;
