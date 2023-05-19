// import React, {useState} from 'react';
// import axios from 'axios'; 
// import {useNavigate} from 'react-router-dom';
// import img1 from "../assets/images/slide-01.jpg";
// import img2 from "../assets/images/slide-02.jpg";
// import img3 from "../assets/images/slide-03.jpg";
// import Product1 from "../assets/images/product-01.jpg";
// import Heart1 from "../assets/images/icon/heart-01.png";
// import Heart2 from "../assets/images/icon/heart-02.svg";
// import Slider from "react-slick";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import "../assets/css/main.css";
// import "../assets/css/main-app.css";

// const Slide = () => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//     }
//     return (
//         <>
//         <section className="section-slide" style={{border:'2px solid blue'}}>
//             <div className="wrap-slick1">
//                 <div className="slick1">
//                     <Slider {...settings}>
//                         <div className="item-slick1" style={{width: '100%'}}>
//                             <div className="w-full h-full" style={{border: '2px solid green', position:'relative'}}>
//                                 <img src={img1} alt="..." 
//                                 style={{position:'absolute',width:'100%',height:'100%',zIndex:1000,top:0,left:0}}
//                                 className="image-fluid" />
                                
//                             </div>
//                         </div>
                                
//                         <div className="" style={{width: '100%'}}>
//                             <div className="item-slick1" style={{border: '2px solid green', position:'relative'}}>
//                                 <img src={img2} alt="..." 
//                                 style={{position:'absolute',width:'100%',height:'100%',zIndex:1000,top:0,left:0}}
//                                 className="image-fluid" />
                                
//                             </div>
//                         </div>
                              
                        
//                     </Slider>
//                 </div>
//             </div>
//         </section>
//             {/* <section className="section-slide">
//                 <div className="wrap-slick1">
//                     <div className="slick1">
                        
//                         <div className="item-slick1" style={{backgroundImage:{img1}}}>
//                             <div className="container h-full">
//                                 <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
//                                     <div className="layer-slick1 animated visible-false" data-appear="fadeInDown" data-delay="0">
//                                         <span className="ltext-101 cl2 respon2">
//                                         Women collection 2018
//                                         </span>
//                                     </div>
                                        
//                                     <div className="layer-slick1 animated visible-false" data-appear="fadeInUp" data-delay="800">
//                                         <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
//                                         NEW SEASON
//                                         </h2>
//                                     </div>
                                        
//                                     <div className="layer-slick1 animated visible-false" data-appear="zoomIn" data-delay="1600">
//                                         <a href="#" className="btn btn-primary flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04">
//                                         Shop Now
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
                                    
//                     </div>
//                 </div>
//             </section> */}
//         </>
//     );
// }

// export default Slide;
