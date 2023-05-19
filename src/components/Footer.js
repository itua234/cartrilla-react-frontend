import React, {useState} from 'react';
import axios from 'axios'; 
import creditCard from "../assets/images/footer/credit-card.svg";
import headPhones from "../assets/images/footer/headphones.svg";
import startUp from "../assets/images/footer/startup.svg";
import bill from "../assets/images/footer/bill.svg";
import "../assets/css/util.css";
import "../assets/css/bootstrap.css";
import "../assets/css/main-app.css";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState({display: "none"});

    const handleErrors = (error, input) => {
        setErrors(values => ({...values, [input]: error}));
    }

    const handleMessage = (message) => {
        setMsg(message);
    }

    const Newsletter = (e) => {
        e.preventDefault();
        setLoading({display: "flex"});
        alert(email);
        
        axios.post('http://localhost:8000/api/v1/auth/register', {email: email})
        .then((res) => {
            //history.push("/dashboard");
        }).catch((error) => {
            let errors = error.response.data.error;

            if(errors.email){
                handleErrors(errors.email, 'email');
            }else{
                handleErrors('', 'email');
            }
        });
    }
    return (
        <>
            <section className="bg-dark-footer">
                <div className="container-fluid p-t-40 p-b-40">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                            <h6 className="text-white">Shop departments</h6>
                            <ul className="widget-list list-unstyled">
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Sneakers &amp; Athletic</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Athletic Apparel</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Sandals</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Jeans</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Shirts &amp; Tops</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Shorts</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">T-Shirts</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Swimwear</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Clogs &amp; Mules</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Bags &amp; Wallets</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Accessories</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Sunglasses &amp; Eyewear</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Watches</a></li>
                            </ul>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                            <h6 className="text-white">Account &amp; shipping info</h6>
                            <ul className="widget-list list-unstyled">
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Your account</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Shipping rates &amp; policies</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Refunds &amp; replacements</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Order tracking</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Delivery info</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Taxes &amp; fees</a></li>
                            </ul>
                            <h6 className="text-white">About us</h6>
                            <ul className="widget-list list-unstyled">
                            <li className="widget-list-item"><a className="widget-list-link" href="#">About company</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Our team</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">Careers</a></li>
                            <li className="widget-list-item"><a className="widget-list-link" href="#">News</a></li>
                            </ul>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                            <h6 className="text-white m-b-15">Stay informed</h6>
                            <form className="newsletter container-fluid p-0" onSubmit={Newsletter}>
                                <div className="row no-gutters">
                                    <div className="col-8 col-md-6">
                                        <input 
                                        type="email" 
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-full rounded-start form-control" 
                                        placeholder="Your email" />
                                    </div>
                                    <div className="col-4 col-md-6 pos-relative">
                                        <button type="submit" 
                                        className="btn btn-primary rounded-end w-full" 
                                        name="subscribe">Subscribe*</button>
                                        <div className="newsletter-animation pos-absolute rounded-end" style={isLoading}>
                                            <div className="wave"></div>
                                            <div className="wave"></div>
                                            <div className="wave"></div>
                                            <div className="wave"></div>
                                            <div className="wave"></div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <p className="text-white fs-12 p-t-5 op-05">*Subscribe to our newsleter to receive early discount offers, updates and new products info.</p>
                            <p className="newsletter-message newsletter-success-message"></p>
                            <p className="newsletter-message newsletter-error-message"></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-darker container-fluid p-t-50 p-b-30">
                <div className="">
                    <div className="row">
                        <div className="d-flex col-sm-6 col-lg-3 col-xl-3 col-md-3">
                            <span className="media"><img alt="" className="w-h-30 m-r-15" src={startUp} /></span>
                            <div className="media-body">
                            <h6 className="text-white">Fast and free delivery</h6>
                            <p className="text-white op-05 fs-12">Free delivery for all orders over $200</p>
                            </div>
                        </div>
                        <div className="d-flex col-sm-6 col-lg-3 col-xl-3 col-md-3">
                            <span className="media"><img alt="" className="w-h-30 m-r-15" src={bill} /></span>
                            <div className="media-body">
                            <h6 className="text-white">Money back guarantee</h6>
                            <p className="text-white op-05 fs-12">We return money within 30days</p>
                            </div>
                        </div>
                        <div className="d-flex col-sm-6 col-lg-3 col-xl-3 col-md-3">
                            <span className="media"><img alt="" className="w-h-30 m-r-15" src={headPhones} /></span>
                            <div className="media-body">
                            <h6 className="text-white">24/7 customer support</h6>
                            <p className="text-white op-05 fs-12">Friendly 24/7 customer support</p>
                            </div>
                        </div>
                        <div className="d-flex col-sm-6 col-lg-3 col-xl-3 col-md-3">
                            <span className="media"><img alt="" className="w-h-30 m-r-15" src={creditCard} /></span>
                            <div className="media-body">
                            <h6 className="text-white">Secure online payment</h6>
                            <p className="text-white op-05 fs-12">We possess SSL / Secure certificate</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-white fs-12 op-05 m-t-40">© All rights reserved. Made by <a className="" href="https://createx.studio/">Createx Studio</a></p>
            </section>
        </>
    );
}

export default Footer;