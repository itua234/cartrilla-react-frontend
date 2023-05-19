import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import {useNavigate,useParams} from 'react-router-dom';
import "../assets/css/util.css";
import "../assets/css/bootstrap.css";
import "../assets/css/main-app.css";
import Footer from '../components/Footer';
import {APP_ROUTES, API_ROUTES} from '../utils/constants';

const PasswordReset = () => {
    let { email, token } = useParams();
    const navigate = useNavigate();
    var [inputs, setInputs] = useState({});
    const [msg, setMsg] = useState('');
    var [errors, setErrors] = useState({});
    const [isVisible, setVisibility] = useState(false);
    const [isLoading, setLoading] = useState({display: "none"});

    useEffect(() => {
        axios.get(API_ROUTES.VERIFY_RESET_TOKEN+email+'/'+token)
        .then((res) => {
            setMsg(res.data.message);
            setInputs(values => ({...values, email: email}));
            setInputs(values => ({...values, token: token}));
        }).catch((error) => {
            let errors = error.response.data.error;
            if(error.response.status == 400){
                handleMessage(error.response.data.message)
            }
        });
    },[]);
    
    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleErrors = (error, input) => {
        setErrors(values => ({...values, [input]: error}));
    }

    const handleMessage = (message) => {
        setMsg(message);
    }

    const Reset = (event) => {
        event.preventDefault();
        setLoading({display: "flex"});
        setErrors({});
        
        axios.post(API_ROUTES.PASSWORD_RESET, inputs)
        .then((res) => {
            setLoading({display: "none"});

        }).catch((error) => {
            let errors = error.response.data.error;
            if(errors.password){
                handleErrors(errors.password, 'password');  
            }
            if(errors.password_confirmation){
                handleErrors(errors.password_confirmation, 'password_confirmation');
            }
            setLoading({display: "none"});
        });
    }
    
    if(msg !== 'Invalid data.'){
    return (
        <>
        <section className="m-t-80 m-b-30">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-xl-5 col-md-6 col-sm-7" style={{padding:'20px'}}>
                        <span className="d-block text-success text-center">{msg}</span>
                        <h3 className="text-center" style={{fontWeight:'bolder'}}>Password Reset</h3>
                        <form onSubmit={Reset}>
                            <div className="d-flex flex-column m-t-15">
                                <input 
                                type="hidden" 
                                placeholder="Email"
                                value={inputs.email}
                                name="email"
                                className="form-control form-control-border" />
                            </div>
                            <div className="d-flex flex-column m-t-15">
                                <input 
                                type="hidden" 
                                placeholder="Token"
                                value={inputs.token}
                                name="token"
                                className="form-control form-control-border" />
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
                            
                            <div className="d-flex justify-content-end m-t-20 pos-relative">
                                <button 
                                type="submit" 
                                className="btn btn-primary rounded-all w-100">
                                    Submit
                                </button>
                                <div className="newsletter-animation pos-absolute rounded-all" style={isLoading}>
                                    <div className="wave"></div>
                                    <div className="wave"></div>
                                    <div className="wave"></div>
                                    <div className="wave"></div>
                                    <div className="wave"></div>
                                </div>
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

export default PasswordReset;
