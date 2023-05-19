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
    
    useEffect(() => {
        async function getUserDetails(){
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get(API_ROUTES.GET_USER, config)
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
    
    return (
        <>
        {
            authenticated
            ?
            <>
            <Navbar user={user}/>
            <section className="" style={{marginTop:'80px', paddingBottom:"40px"}}>
                <div className="container">
                    <div className="row">
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
            :
            navigate(APP_ROUTES.SIGN_IN)
        }
        </>
    );
}

export default EditAccount;
