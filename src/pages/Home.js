import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import edit from "../assets/images/footer/edit.svg";
import instagram from "../assets/images/footer/instagram.svg";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Blog from '../components/Blog';
import Products from '../components/Products';
import {API_ROUTES} from '../utils/constants.js';
import "../assets/css/main.css";
import { useCart, useUser } from '../lib/customHooks';

const Home = () => {
    const { user } = useUser();
    const { cartItems } =  useCart();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(API_ROUTES.GET_PRODUCTS)
        .then((res) => {
            let data = res.data.results;
            setProducts(data);
        })
    },[]);
    return (
        <>
            <Navbar user={user} cart={cartItems} />
            <section className="" style={{marginTop:'80px'}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-center p-b-15 p-t-40 bg-faded-primary">
                            <span className="media d-block m-b-15"><img className="w-h-30" src={edit} /></span>
                            <h5>Read the blog</h5>
                            <p className="fs-12 m-t--10">Latest store, fashion news and trends</p>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-center p-b-15 p-t-40 bg-faded-accent">
                            <span className="media d-block m-b-15"><img className="w-h-30" src={instagram} /></span>
                            <h5>Follow on Instagram</h5>
                            <p className="fs-12 m-t--10">#ShopWithCartzilla</p>
                        </div>
                    </div>
                </div>
            </section>
            <Products list={products} />
            <Blog />
            <Footer />
        </>
    );
}

export default Home;
