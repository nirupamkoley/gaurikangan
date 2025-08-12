import React from "react";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Signup() {

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate form fields
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
            });
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            });
            setIsLoading(false);
            return;
        }
        
        let formData = new FormData();
        formData.append("fname", firstName);
        formData.append("lname", lastName);
        formData.append("email", email);
        formData.append("contact", phone);
        formData.append("password", password);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
            method: "POST",
            body: formData,
        })
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: data.message[0],
            });
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirmPassword("");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message[0],
            });
        }
        setIsLoading(false);
    }

    return (
        <div>
            <section className="fluid-block bg-light py-2 login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <h2 className="text-center text-dark mt-5 fw-bold text-white">Create an Account</h2>
                            <div className="card my-5 border-0 rounded-0 overflow-hidden shadow-lg">
                                <div className="card-body p-5">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label fw-bold">First Name</label>
                                        <input type="text" className="form-control p-2" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label fw-bold">Last Name</label>
                                        <input type="text" className="form-control p-2" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-bold">Email ID</label>
                                        <input type="email" className="form-control p-2" onChange={(e) => setEmail(e.target.value)} value={email} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ph" className="form-label fw-bold">Phone No.</label>
                                        <input type="text" className="form-control p-2" onChange={(e) => setPhone(e.target.value)} value={phone} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pass" className="form-label fw-bold">Password</label>
                                        <input type="password" className="form-control p-2" onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ph" className="form-label fw-bold">Confirm Password</label>
                                        <input type="password" className="form-control p-2" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                                    </div>
                                    <div className="text-center mt-3">
                                        {
                                            isLoading 
                                            ? 
                                                <button type="button" className="btn btn-primary w-100" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Loading...
                                                </button>
                                            : 
                                                <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Register</button>
                                        }
                                    </div>
                                    <div className="form-text text-center mt-3 text-dark">Already have ancaccount?
                                        <Link href="/auth/login" className="text-dark fw-bold"> Login Now!</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}