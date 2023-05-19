import React, {useState} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import "../assets/css/util.css";
import "../assets/css/bootstrap.css";
import "../assets/css/main-app.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useCart, useUser } from '../lib/customHooks';
import {APP_ROUTES, API_ROUTES} from '../utils/constants';

const Login = () => {
    const navigate = useNavigate();
    const { user, authenticated } = useUser();
    const {cartItems} = useCart();
    const [inputs, setInputs] = useState({});
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState({display: "none"});
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

    const Login = (event) => {
        event.preventDefault();
        setLoading({display: "flex"});
        
        axios.post(API_ROUTES.SIGN_IN, inputs)
        .then((res) => {
            let token = res.data.results;
            localStorage.setItem('token', token);
            return navigate(APP_ROUTES.DASHBOARD);
        }).catch((error) => {
            setErrors({});
            setMsg('');
            let errors = error.response.data.error;
            if(errors.email){
                handleErrors(errors.email, 'email');
            }

            if(errors.password){
                handleErrors(errors.password, 'password');
            }

            switch(error.response.status){
                case 400:
                    handleMessage(error.response.data.message)
                break;
                case 401:
                    handleMessage(error.response.data.message);
                break;
            }
            setLoading({display: "none"});
        });
    }
    
    return (
        <>
        {
            authenticated
            ?
            navigate(APP_ROUTES.DASHBOARD)
            :
            <>
            <Navbar user={user} cart={cartItems} />
            <section className="m-t-80 m-b-30">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-xl-5 col-md-6 col-sm-7" style={{padding:'20px'}}>
                            <span className="error d-block" style={{textAlign:'center'}}>{msg}</span>
                            <h3 className="text-center" style={{fontWeight:'bolder'}}>Sign in</h3>
                            <form onSubmit={Login}>
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
                                
                                <div className="d-flex justify-content-end m-t-20 pos-relative">
                                    <button 
                                    type="submit" 
                                    className="btn btn-primary rounded-all w-100">
                                        Sign In
                                    </button>
                                    <Loader display={isLoading} />
                                </div>
                            </form>
                        </div>
                    </div>  
                </div>
            </section>
            <Footer />
            </>
        }
        </>
    );
}

export default Login;
