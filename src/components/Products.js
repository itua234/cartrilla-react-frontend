import React, {useState, useEffect} from 'react';
import Product1 from "../assets/images/product-01.jpg";
import Heart1 from "../assets/images/icon/heart-01.png";
import Heart2 from "../assets/images/icon/heart-02.svg";

const Products = (props) => {
    return (
        <>
            <div className="container p-t-20">
                <div className="row">
                    {
                        props.list.map((product) => (
                            <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item">
                                <div className="block2">
                                    <div className="block2-pic hov-img0">
                                        <img className="w-full" src={product.images[0]["url"]} alt="IMG-PRODUCT" />
                                        <a href="#" data-id={product.uuid} 
                                        
                                        className="block2-btn d-flex align-items-center justify-content-center fs-15 cl2 bg0 bor2 size-102 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                            Quick View
                                        </a>
                                    </div>
                                    <div className="block2-txt d-flex p-t-14">
                                            <div className="block2-txt-child1 flex-col-l">
                                                <a href={"/product-detail/"+product.uuid} className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                                    {product.name}
                                                </a>

                                                <span className="stext-105 cl3">
                                                    {product.price}
                                                </span>
                                            </div>

                                            <div className="block2-txt-child2 flex-r p-t-3">
                                                <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                                    <img className="w-h-20 icon-heart1 dis-block trans-04" src={Heart1} />
                                                    <img className="w-h-20 icon-heart2 dis-block trans-04 ab-t-l" src={Heart2} />
                                                </a>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Products;
