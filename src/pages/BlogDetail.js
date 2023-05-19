import React, {useState} from 'react';
import axios from 'axios'; 
import blog1 from "../assets/images/blog-01.jpg";
import blog2 from "../assets/images/blog-02.jpg";
import blog3 from "../assets/images/blog-03.jpg";
import blog4 from "../assets/images/blog-04.jpg";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogDetail = () => {
	const [inputs, setInputs] = useState({});
	const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});
	
	const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleErrors = (error, input) => {
        setErrors(values => ({...values, [input]: error}));
    }

    const handleMessage = (message) => setMsg(message);

    const SaveComment = (event) => {
        event.preventDefault();
        setErrors({});
        setMsg("");
		alert(JSON.stringify(inputs));
        
        // axios.post(API_ROUTES.SIGN_IN, inputs)
        // .then((res) => {
        //     alert(res);
        //     let token = res.data.results;
        //     localStorage.setItem('token', token);
        //     navigate(APP_ROUTES.DASHBOARD);
        // })
        // .catch((error) => {
        //     let errors = error.response.data.error;
        //     if(errors.email){
        //         handleErrors(errors.email, 'email');
        //         handleMessage('')
        //     }else{
        //         handleErrors('', 'email');
        //     }

        //     if(errors.password){
        //         handleErrors(errors.password, 'password');
        //         handleMessage('')
        //     }else{
        //         handleErrors('', 'password');
        //     }
            
        //     if(error.response.status == 400){
        //         handleMessage(error.response.data.message)
        //     }

        //     if(error.response.status == 401){
        //         handleMessage(error.response.data.message)
        //     }
        // });
    }

    return (
        <>
		<Navbar />
            <div class="container m-t-60">
                <div class="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <a href="index.html" class="stext-109 cl8 hov-cl1 trans-04">
                        Home
                        <i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </a>

                    <a href="blog.html" class="stext-109 cl8 hov-cl1 trans-04">
                        Blog
                        <i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </a>

                    <span class="stext-109 cl4">
                        8 Inspiring Ways to Wear Dresses in the Winter
                    </span>
                </div>
            </div>

            <section class="bg0 p-t-52 p-b-20">
				<div class="container">
					<div class="row">
						<div class="col-md-8 col-lg-9 p-b-80 col-sm-6">
							<div class="p-r-45 p-r-0-lg">
						
								<div class="wrap-pic-w how-pos5-parent">
									<img src={blog4} alt="IMG-BLOG" style={{width:"100%"}}/>

									<div class="flex-col-c-m size-123 bg9 how-pos5">
										<span class="ltext-107 cl2 txt-center">
											22
										</span>

										<span class="stext-109 cl3 txt-center">
											Jan 2018
										</span>
									</div>
								</div>

								<div class="p-t-32">
									<span class="flex-w flex-m stext-111 cl2 p-b-19">
										<span>
											<span class="cl4">By</span> Admin  
											<span class="cl12 m-l-4 m-r-6">|</span>
										</span>

										<span>
											22 Jan, 2018
											<span class="cl12 m-l-4 m-r-6">|</span>
										</span>

										<span>
											StreetStyle, Fashion, Couple  
											<span class="cl12 m-l-4 m-r-6">|</span>
										</span>

										<span>
											8 Comments
										</span>
									</span>

									<h4 class="ltext-109 cl2 p-b-28">
										8 Inspiring Ways to Wear Dresses in the Winter
									</h4>

									<p class="stext-117 cl6 p-b-26">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet est vel orci luctus sollicitudin. Duis eleifend vestibulum justo, varius semper lacus condimentum dictum. Donec pulvinar a magna ut malesuada. In posuere felis diam, vel sodales metus accumsan in. Duis viverra dui eu pharetra pellentesque. Donec a eros leo. Quisque sed ligula vitae lorem efficitur faucibus. Praesent sit amet imperdiet ante. Nulla id tellus auctor, dictum libero a, malesuada nisi. Nulla in porta nibh, id vestibulum ipsum. Praesent dapibus tempus erat quis aliquet. Donec ac purus id sapien condimentum feugiat.
									</p>

									<p class="stext-117 cl6 p-b-26">
										Praesent vel mi bibendum, finibus leo ac, condimentum arcu. Pellentesque sem ex, tristique sit amet suscipit in, mattis imperdiet enim. Integer tempus justo nec velit fringilla, eget eleifend neque blandit. Sed tempor magna sed congue auctor. Mauris eu turpis eget tortor ultricies elementum. Phasellus vel placerat orci, a venenatis justo. Phasellus faucibus venenatis nisl vitae vestibulum. Praesent id nibh arcu. Vivamus sagittis accumsan felis, quis vulputate
									</p>
								</div>

								<div class="flex-w flex-t p-t-16">
									<span class="size-216 stext-116 cl8 p-t-4">
										Tags
									</span>

									<div class="flex-w size-217">
										<a href="#" class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
											Streetstyle
										</a>

										<a href="#" class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
											Crafts
										</a>
									</div>
								</div>

							
								<div class="p-t-40">
									<h5 class="mtext-113 cl2 p-b-12">
										Leave a Comment
									</h5>

									<p class="stext-107 cl6 p-b-40">
										Your email address will not be published. Required fields are marked *
									</p>

									<form onSubmit={SaveComment}>
										<div class="bor19 m-b-20">
											<textarea class="stext-111 cl2 plh3 size-124 p-lr-18 p-tb-15" 
											name="comment" 
											value={inputs.comment}
											onChange={handleInputs}
											placeholder="Comment..."></textarea>
										</div>

										<div class="bor19 size-218 m-b-20">
											<input class="stext-111 cl2 plh3 size-116 p-lr-18" 
											type="text" 
											name="name" 
											value={inputs.name}
											onChange={handleInputs}
											placeholder="Name *" />
										</div>

										<div class="bor19 size-218 m-b-20">
											<input class="stext-111 cl2 plh3 size-116 p-lr-18" type="text" 
											name="email" 
											value={inputs.email}
											onChange={handleInputs}
											placeholder="Email *" />
										</div>

										<div class="bor19 size-218 m-b-30">
											<input class="stext-111 cl2 plh3 size-116 p-lr-18" 
											type="text" 
											name="web" 
											value={inputs.website}
											onChange={handleInputs}
											placeholder="Website" />
										</div>

										<button type="submit" class="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04">
											Post Comment
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>	
		<Footer />
        </>
    );
}

export default BlogDetail;
