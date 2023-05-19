import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import {useParams} from 'react-router-dom';
import Product1 from "../assets/images/product-01.jpg";
import rightArrow from "../assets/images/icon/right-arrow.svg";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {API_ROUTES} from '../utils/constants.js';
import "../assets/fonts/linearicons-v1.0.0/icon-font.min.css";
import "../assets/fonts/iconic/css/material-design-iconic-font.min.css";
import "../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import Carousel from "react-bootstrap/Carousel";
import Products from '../components/Products';
import { useUser } from '../lib/customHooks';

const ProductDetail = () => {
    let { id } = useParams();
    const { user } = useUser();
    let [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [similar, setSimilar] = useState([]);
    const [cart, setCart] = useState({});

    useEffect(() => {
        var items = JSON.parse(localStorage.getItem('cart'));
        setCart(items);
    },[cart]);

    useEffect(() => {
        axios.get(API_ROUTES.GET_PRODUCT+id)
        .then((res) => {
            let data = res.data.results;
            setProduct(data);
            setImages(data.images);
            axios.get(API_ROUTES.GET_PRODUCT+data.uuid+"/"+data.category_id)
            .then((res) => {
                let data = res.data.results;
                setSimilar(data);
            })
        })
    },[]);

    const plus = () => {
        setQuantity(parseInt(quantity) + 1);
    }
    const changeQuantity = (quantity) => setQuantity(parseInt(quantity) - 1);
    const minus = () => {
        if(quantity > 1){
            changeQuantity(quantity);
        }
        
    }
    let deg = "-180deg"
    const style = {
        transform: `rotate(${deg})`
    }
    const nextIcon = <button class="arrow-slick2 next-slick2 d-flex justify-content-center align-items-center" style={{right:"-10px"}}>
        <img class="w-h-25" src={rightArrow} />
    </button>;
    const prevIcon = <button class="arrow-slick2 prev-slick2 d-flex justify-content-center align-items-center" style={{left:"60px"}}>
        <img class="w-h-25" style={style}  src={rightArrow} />
    </button>;
    
    const addToCart = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        var input = {
            uuid: data.get('productId'),
            quantity: parseInt(data.get('quantity')),
            price: product.price,
            subtotal: product.price * parseInt(data.get('quantity')),
            total: (product.price * parseInt(data.get('quantity'))) + 500
        };
        var uuid = product.uuid;
        let cartArray = {
            [uuid]: {
                name: product.name,
                uuid: input.uuid,
                price: product.price,
                quantity: input.quantity,
                image: product.images[0]["url"],
                total: input.price * input.quantity
            }
        };
        
        if(Object.keys(cart).length === 0){
            localStorage.setItem('cart', JSON.stringify(cartArray));
            setCart(cart);
        }else{
            var keys = Object.keys(cart);
            if(keys.includes(`${uuid}`)){
                var obj = Object.assign(cart, {[uuid]: {
                    name: product.name,
                    uuid: input.uuid,
                    price: product.price,
                    quantity: input.quantity,
                    image: product.images[0]["url"],
                    total: input.price * input.quantity
                }});
                localStorage.setItem('cart', JSON.stringify(obj));
                setCart(obj);
            }else{
                var obj = Object.assign(cart, {[uuid]: {
                    name: product.name,
                    uuid: input.uuid,
                    price: product.price,
                    quantity: input.quantity,
                    image: product.images[0]["url"],
                    total: input.price * input.quantity
                }});
                localStorage.setItem('cart', JSON.stringify(obj));
                setCart(obj);
            }
        }
        
    }
    return (
        <>
        <Navbar user={user} cart={cart} />
        <section className="sec-product-detail bg0 p-t-65 p-b-60">
            <div className="container">
                <div className="row">
                    <div class="col-md-6 col-lg-7 p-b-30">
                        <div class="p-l-25 p-r-30 p-lr-0-lg">
                            <div class="wrap-slick3 flex-sb flex-w">
                            <Carousel nextIcon={nextIcon} indicators={false}
                            prevIcon={prevIcon} nextLabel={null} prevLabel={null}>
                                {
                                    images.map((image) => (
                                        <Carousel.Item>
                                            <div className="d-flex justify-content-between">
                                                <div class=""
                                                style={{
                                                width:"11.111111%",
                                                height:"50px",
                                                }}>
                                                    <img class="w-full h-full" src={Product1} alt="IMG-PRODUCT" />
                                                </div>
                                                <div class="slick3">
                                                    <div class="wrap-pic-w pos-relative">
                                                        <img class="w-full" src={Product1} alt="IMG-PRODUCT" />

                                                            <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="">
                                                                <i class="fa fa-expand"></i>
                                                            </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                            </div>
                        </div>
                    </div>
                
                    
                    <div className="col-md-6 col-lg-5 p-b-30">
                        <div className="p-r-50 p-t-5 p-lr-0-lg">
                            <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                                {product.name}
                            </h4>

                            <span className="mtext-106 cl2">
                                ${product.price}
                            </span>

                            <p className="stext-102 cl3 p-t-23">
                                {product.description}
                            </p>
                            
                            <form className="add_to_cart_form p-t-33" onSubmit={addToCart}>
                                <div className="flex-w flex-r-m p-b-10">
                                    <div className="size-203 flex-c-m respon6">
                                        Size
                                    </div>
                                
                                    <div className="size-204 respon6-next">
                                        <div className="rs1-select2 bor8 bg0">
                                            <select className="form-control form-control-border" name="size">
                                                <option>Choose an option</option>
                                                <option>Size S</option>
                                                <option>Size M</option>
                                                <option>Size L</option>
                                                <option>Size XL</option>
                                            </select>
                                            <div className="dropDownSelect2"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-w flex-r-m p-b-10">
                                    <div className="size-203 flex-c-m respon6">
                                        Color
                                    </div>

                                    <div className="size-204 respon6-next">
                                        <div className="rs1-select2 bor8 bg0">
                                            <select className="form-control form-control-border" name="color">
                                                <option>Choose an option</option>
                                                <option>Red</option>
                                                <option>Blue</option>
                                                <option>White</option>
                                                <option>Grey</option>
                                            </select>
                                            <div className="dropDownSelect2"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-w flex-r-m p-b-10">
                                    <div className="size-204 flex-w flex-m respon6-next">
                                        <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                            <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                            onClick={minus}>
                                                <i className="fs-16 zmdi zmdi-minus"></i>
                                            </div>

                                            <input className="mtext-104 cl3 txt-center num-product" type="number" 
                                            name="quantity"
                                            onChange={(e) => setQuantity(e.target.value)}
                                            value={quantity} />

                                            <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                            onClick={plus}>
                                                <i className="fs-16 zmdi zmdi-plus"></i>
                                            </div>
                                        </div>
                                        <input type="hidden" name="productId" value={product.uuid} />
                                        <button type="submit" name="sub_item" style={{border:"none"}} className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                                            Add to cart
                                        </button>
                                        <span className="demos"></span>
                                    </div>
                                </div>
                            </form>

                        
                            <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                                <div className="flex-m bor9 p-r-10 m-r-11">
                                    <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
                                        <i className="zmdi zmdi-favorite"></i>
                                    </a>
                                </div>

                                <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
                                    <i className="fa fa-facebook"></i>
                                </a>

                                <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Twitter">
                                    <i className="fa fa-twitter"></i>
                                </a>

                                <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
                                    <i className="fa fa-google-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                    

                <div className="bg6 flex-c-m flex-w size-302 m-t-73">
                    <span className="stext-107 cl6 p-lr-25">
                        SKU: JAK-01
                    </span>

                    <span className="stext-107 cl6 p-lr-25">
                        Categories: Jacket, Men
                    </span>
                </div>
            </div>
        </section>
        <section class="sec-relate-product bg0 p-b-105">
            <div className="">
                <div class="">
                    <h3 class="ltext-106 cl5 txt-center">
                        Related Products
                    </h3>
                </div>
                <Products list={similar} />
            </div>
        </section>

        <Footer />
        </>
    );
}

export default ProductDetail;
