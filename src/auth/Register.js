import React, {useState} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import "../assets/css/util.css";
import "../assets/css/bootstrap.css";
import "../assets/css/main-app.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart, useUser } from '../lib/customHooks';
import {APP_ROUTES, API_ROUTES} from '../utils/constants';

const Register = () => {
    const navigate = useNavigate();
    const { user, authenticated } = useUser();
    const {cartItems} = useCart();
    const [inputs, setInputs] = useState({});
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});
    const [isVisible, setVisibility] = useState(false);
    
    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleErrors = (error, input) => {
        setErrors(values => ({...values, [input]: error}));
    }

    const handleMessage = (message) => setMsg(message);

    const Register = (e) => {
        e.preventDefault();
        setErrors({});
        setMsg("");
        
        axios.post(API_ROUTES.SIGN_UP, inputs)
        .then((res) => {
            alert(res);
            let message = res.data.message;
            handleMessage(message);
            //navigate(APP_ROUTES.SIGN_IN);
        }).catch((error) => {
            let errors = error.response.data.error;
            if(errors.firstname){
                handleErrors(errors.firstname, 'firstname');
            }

            if(errors.lastname){
                handleErrors(errors.lastname, 'lastname');
            }

            if(errors.phone){
                handleErrors(errors.phone, 'phone');
            }

            if(errors.email){
                handleErrors(errors.email, 'email');
            }

            if(errors.password){
                handleErrors(errors.password, 'password');
            }

            if(errors.password_confirmation){
                handleErrors(errors.password_confirmation, 'password_confirmation');
            }
        });
    }
    return (
        <>
        <Navbar user={user} cart={cartItems} />
        <section className="m-t-80 m-b-30">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-xl-5 col-md-6 col-sm-7" style={{padding:'20px'}}>
                        <span className="error d-block" style={{textAlign:'center'}}>{msg}</span>
                        <h3 className="text-center" style={{fontWeight:'bolder'}}>Sign Up</h3>
                        <form onSubmit={Register}>
                            <div className="d-flex flex-column m-t-15">
                                <input 
                                type="text" 
                                placeholder="Firstname"
                                value={inputs.firstname}
                                name="firstname"
                                onChange={handleInputs} 
                                className="form-control form-control-border" />
                                <span className="error">{errors.firstname}</span>
                            </div>

                            <div className="d-flex flex-column m-t-15">
                                <input 
                                type="text" 
                                placeholder="Lastname"
                                value={inputs.lastname}
                                name="lastname"
                                onChange={handleInputs} 
                                className="form-control form-control-border" />
                                <span className="error">{errors.lastname}</span>
                            </div>

                            <div className="d-flex flex-column m-t-15">
                                <input 
                                type="email" 
                                placeholder="Email"
                                value={inputs.email}
                                name="email"
                                onChange={handleInputs}  
                                className="form-control form-control-border" />
                                <span className="error">{errors.email}</span>
                            </div>

                            <div className="d-flex flex-column m-t-15">
                                <input 
                                type="number" 
                                placeholder="Phone"
                                value={inputs.phone}
                                name="phone"
                                onChange={handleInputs}  
                                className="form-control form-control-border" />
                                <span className="error">{errors.phone}</span>
                            </div>
                            
                            <div className="d-flex flex-column m-t-15">
                                <div className="d-flex" style={{border:'1px solid #e9ecef'}}>
                                    <input 
                                    type={isVisible ? "text" : "password"} 
                                    placeholder="Password" 
                                    value={inputs.password}
                                    name="password"
                                    onChange={handleInputs} 
                                    className="form-control" />
                                    <span 
                                    class="d-flex align-items-center justify-content-center p-r-10 p-l-10" 
                                    onClick={() => setVisibility(!isVisible)}>
                                        <i class="lni lni-eye"></i>
                                    </span>
                                </div>
                                <span className="error">{errors.password}</span>
                            </div>

                            <div className="d-flex flex-column m-t-15">
                                <div className="d-flex" style={{border:'1px solid #e9ecef'}}>
                                    <input 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    value={inputs.password_confirmation}
                                    name="password_confirmation"
                                    onChange={handleInputs} 
                                    className="form-control" />
                                </div>
                                <span className="error">{errors.password_confirmation}</span>
                            </div>
                            
                            
                            <div className="d-flex justify-content-end m-t-20">
                                <button 
                                type="submit" 
                                className="btn btn-primary rounded-all w-100">
                                    Sign Up
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

export default Register;
