import React from "react";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { apiRequest } from "../../utils/api";
import Link from "next/link"; // Added import for Link

// import Test from "./test";
// import TestLogin from "../test-logn";

// import Signup from "./signup";

export default function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Check if user is already logged in
    useEffect(() => {
        // const allCookies = Cookies.get(); // Log all cookies for debugging
        // console.log("All Cookies:", allCookies);
        const token = Cookies.get("_customer_token");
        console.log("Token:", token); // Debugging log
        if (token) {
            window.location.href = "/my-account/orders";
        }



    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate form fields
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
            });
            setIsLoading(false);
            return;
        }

        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        // Make API call using the apiRequest utility
        const data = await apiRequest(process.env.NEXT_PUBLIC_API_URL + '/login', {
            method: 'POST',
            body: formData,
        });

        if (data.success === true) {
            Cookies.set("_customer_token", data.token, { expires: 7 }); // Store token in cookies for 7 days
            window.location.href = "/my-account/orders"; // Redirect to account page
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
            });
        }
        setIsLoading(false);
    };


// ////////// touggle from box start


     const [isSignUp, setIsSignUp] = useState(false);
    
      useEffect(() => {
        const container = document.getElementById('container');
        
        // Add the class when `isSignUp` is true
        if (container) {
          if (isSignUp) {
            container.classList.add('right-panel-active');
          } else {
            container.classList.remove('right-panel-active');
          }
        }
      }, [isSignUp]); // Effect runs whenever `isSignUp` changes

// ///////////////////////////

// ///// sign up start

  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSignupLoading(true);

    if (
      !signupFirstName ||
      !signupLastName ||
      !signupEmail ||
      !signupPhone ||
      !signupPassword ||
      !signupConfirmPassword
    ) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please fill all the fields!' });
      setIsSignupLoading(false);
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Passwords do not match!' });
      setIsSignupLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('fname', signupFirstName);
    formData.append('lname', signupLastName);
    formData.append('email', signupEmail);
    formData.append('contact', signupPhone);
    formData.append('password', signupPassword);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        Swal.fire({ icon: 'success', title: 'Success', text: data.message[0] });
        setSignupFirstName('');
        setSignupLastName('');
        setSignupEmail('');
        setSignupPhone('');
        setSignupPassword('');
        setSignupConfirmPassword('');
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: data.message[0] });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong. Please try again.' });
    }

    setIsSignupLoading(false);
  };


// ///// sign up end

    
    return (
        <div>
          {/* <Test/>
          <TestLogin/> */}

            <section className="fluid-block login pt-5 border-bottom">
         
        <div className="container" id="container">
            {/* <div className="form-container signup-container"> */}
                 <div className={`form-container signup-container ${isSignUp ? '' : 'hidden'}`}>
                <form onSubmit={handleSignup}>
                    {/* <Signup/> */}
                    <h2 className="fs-3">Create Account</h2>
                    {/* <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="phone" placeholder="Phone" />*/}
                    {/* <input type="password" placeholder="Password" />  */}
                   <input
            type="text"
            className="form-control p-2"
            placeholder="First Name"
            value={signupFirstName}
            onChange={(e) => setSignupFirstName(e.target.value)}
          />
           <input
            type="text"
            className="form-control p-2"
            placeholder="Last Name"
            value={signupLastName}
            onChange={(e) => setSignupLastName(e.target.value)}
          />

           <input
            type="email"
            className="form-control p-2"
            placeholder="Email ID"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />

          <input
            type="text"
            className="form-control p-2"
            placeholder="Phone No"
            value={signupPhone}
            onChange={(e) => setSignupPhone(e.target.value)}
          />





 <input
            type="password"
            className="form-control p-2"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control p-2"
            placeholder="Confirm Password"
            value={signupConfirmPassword}
            onChange={(e) => setSignupConfirmPassword(e.target.value)}
          />
                    {/* <div className="zcard-body zp-5"> */}
       
       
        <div className="text-center mt-3">
          {isSignupLoading ? (
            <button type="button" className="btn btn-primary w-100" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-100">
              Sign up
            </button>
          )}
        </div>
        {/* <div className="form-text text-center mt-3 text-dark">
          Already have an account?
          <Link href="/auth/login" className="text-dark fw-bold"> Login Now!</Link>
        </div> */}
      {/* </div> */}
                    {/* <button>Sign up 222</button> */}
                </form>
                
            </div>

            {/* <div className="form-container login-container"> */}
            <div className={`form-container login-container ${isSignUp ? 'hidden' : ''}`}>
                <form action="#">
                    <h2 className="fs-3">Login now!</h2>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
                    </div>
                    <span>or use your account</span>
                    <input type="text" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} />
                    <a href="#" className="text-dark py-3">Forgot your password?</a>  

                                        {
                                            isLoading ?
                                                <button type="button" className="btn btn-primary w-100" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Loading...
                                                </button>
                                            :
                                                <button type="submit" className="zbtn zbtn-primary zw-100" onClick={handleSubmit}>Login</button>
                                        }


                                              {/* <button>Login</button> */}
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="login"  onClick={() => setIsSignUp(false)}>Login</button>
                    </div>

                    <div className="overlay-panel overlay-right">
                        <h1>Hello Friend</h1>
                        <p>Enter your personal details and start journey with us</p>

                         {/* <Link href="/auth/signup">
                                           
                                            <button className="ghost" id="signup">Signup</button>
                                        </Link> */}
                        <button className="ghost" id="signup"   onClick={() => setIsSignUp(true)} > Signup </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}
