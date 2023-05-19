import React, {useState} from 'react'; 
import userImg from "../assets/images/icon/user.svg";
import SignedUserImg from "../assets/images/icon/logged_user.svg";
import shoppingcart from "../assets/images/icon/shopping-cart.svg";
import wishlist from "../assets/images/icon/heart-01.png";

const Navbar = ({user, cart}) => {
    return (
        <>
            <section className="d-flex align-items-center pos-fixed" style={{zIndex:500,padding:"0 15px",height:'60px',top:0,left:0,width:"100%"}}>
                <a href="/" style={{marginRight:'auto'}}><span>CARTZILLA</span></a>
                <div className="m-r-15">
                    <a href="/myaccount"><img className="w-h-30" src={user ? SignedUserImg : userImg} /></a>
                </div>
                <div className="pos-relative cart-count m-r-15 d-flex align-items-center justify-content-center" style={{backgroundColor:'#e9ecef',borderRadius:'50%',width:'40px',height:'40px'}}>
                    <img alt="" className="w-h-25" src={wishlist} />
                    <div className="fs-12 d-flex align-items-center justify-content-center pos-absolute" style={{width:'20px',height:'20px',color:'white',borderRadius:'50%',backgroundColor:'#fe696a',top:'-6px',right:'-8px'}}>
                        0
                    </div>
                </div>
                <div className="js-show-cart pos-relative m-r-15 d-flex align-items-center justify-content-center" style={{backgroundColor:'#e9ecef',borderRadius:'50%',width:'40px',height:'40px'}}>
                    <img alt="" className="w-h-25" src={shoppingcart} />
                    <div className="cart-total-quantity fs-12 d-flex align-items-center justify-content-center pos-absolute" style={{width:'20px',height:'20px',color:'white',borderRadius:'50%',backgroundColor:'#fe696a',top:'-6px',right:'-8px'}}>
                        {Object.keys(cart).length}
                    </div>
                </div>
                <div className="hamburger" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <div className="menu menu-1"></div>
                    <div className="menu menu-2"></div>
                    <div className="menu menu-3"></div>
                </div>
            </section>
            <div className="collapse container p-t-15 p-b-20" id="collapseExample">
                <div className="row">
                    <div className="col">
                        <form className="w-full">
                            <input type="text" className="form-control form-control-border rounded-all" placeholder="Search for products" />
                        </form>
                        <ul className="list-unstyled m-t-10">
                            <li className="nav-list rounded-all"><a href="index.php" className="nav-list-link">Home</a></li>
                            <li className="nav-list m-t-10 rounded-all"><a href="index.php" className="nav-list-link">Shop</a></li>
                            <li className="nav-list m-t-10 rounded-all"><a href="index.php" className="nav-list-link">Blog</a></li>
                            <li className="nav-list m-t-10 rounded-all"><a href="index.php" className="nav-list-link">About</a></li>
                            <li className="nav-list m-t-10 rounded-all"><a href="index.php" className="nav-list-link">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <section className="pos-fixed w-full bg-white" style={{zIndex:500,height:'60px',bottom:0,left:0,borderTop:'1px solid #e9ecef'}}>
                <div className="container h-full">
                    <div className="row h-full">
                        <div className="col-4 flex-column d-flex justify-content-center align-items-center">
                            <img alt="" className="w-h-30" src={wishlist} />
                            <span className="fs-12">Wishlist</span>
                        </div>
                        <div className="col-4 flex-column d-flex justify-content-center align-items-center" style={{borderLeft:'1px solid #e9ecef'}} data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <div className="hamburger m-b-5">
                                <div className="menu menu-1"></div>
                                <div className="menu menu-2"></div>
                                <div className="menu menu-3"></div>
                            </div>
                            <span className="fs-12">Menu</span>
                        </div>
                        <div className="col-4 flex-column d-flex justify-content-center align-items-center" style={{borderLeft:'1px solid #e9ecef'}}>
                            <img alt="" className="w-h-30" src={shoppingcart} />
                            <div className="fs-12"><span className="cart-total-price"></span></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Navbar;
