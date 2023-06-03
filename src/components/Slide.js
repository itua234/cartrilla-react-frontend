import React, {useState} from 'react';
import img1 from "../assets/images/slide-01.jpg";
import img2 from "../assets/images/slide-02.jpg";
import img3 from "../assets/images/slide-03.jpg";
import Carousel from "react-bootstrap/Carousel";
import "../assets/css/main.css";
import "../assets/css/main-app.css";

const Slide = () => {
    return (
        <>
        <section className="section-slide">
            <div className="wrap-slick1">
                <div className="slick1">
                    <Carousel indicators={false} controls={false}
                    nextLabel={null} prevLabel={null}>
                        <Carousel.Item>
                            <div className="item-slick1" style={{backgroundImage:`url(${img1})`}}>
                                
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="item-slick1" style={{backgroundImage:`url(${img2})`}}>
                                
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="item-slick1" style={{backgroundImage:`url(${img3})`}}>
                                
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </section>
        </>
    );
}

export default Slide;
