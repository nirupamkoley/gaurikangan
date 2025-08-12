import SideBar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { apiRequest } from "../../utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// server side props
export async function getServerSideProps(context) {
    const { req } = context;
    const token = req.cookies._customer_token || null;
    
    // fetch user data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/user_details`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    // Check if the response is valid
    if (!res.ok) {
        return {
          notFound: true,
        };
    }

    const data = await res.json();
    // check if user is authenticated
    if (!data.success) {
        // destroy the cookie
        Cookies.remove("_customer_token");
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
    return {
        props: {
            data,
        },
    };
}

export default function Profile({ data }) {

    // console.log('user data', data);
    const [user_data, setUserData] = useState(data.userDetails);
    const [profileInfo, setProfileInfo] = useState(data.userDetails?.customer_billing);
    const [isLoading, setIsLoading] = useState(false);

    // user information
    const [fname, setFname] = useState(profileInfo?.fname);
    const [lname, setLname] = useState(profileInfo?.lname);
    const [email, setEmail] = useState(profileInfo?.email);
    const [contact, setContact] = useState(profileInfo?.contact);
    const [alt_contact, setAltContact] = useState(profileInfo?.alt_contact);
    const [address, setAddress] = useState(profileInfo?.address);
    const [pin_code, setPincode] = useState(profileInfo?.pin_code);

    // update user info
    const updateUserInfo = async () => {
        setIsLoading(true);
        let formData = new FormData();
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("email", email);
        formData.append("contact", contact);
        formData.append("alt_contact", alt_contact);
        formData.append("address", address);
        formData.append("pin_code", pin_code);
        formData.append("user_id", user_data.id);

        const res = await apiRequest(process.env.NEXT_PUBLIC_API_URL + '/user/update_billing_address', {
            method: 'POST',
            body: formData,
        });
        if (res.success) {
            // setUserData(res.userDetails);
            setProfileInfo(res.billingDetails);
            setIsLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message[0],
            });
        } else {
            setIsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.message[0],
            });
        }
    }

    return (
        <>
            <section className="fluid-block cart profile border-bottom">
                <div className="container">
                    <div className="row col-lg-10 col-sm-12 mx-auto">
                        {/* Left Column */}
                        <SideBar userData={user_data} />
                        {/* Right Column */}
                        <div className="col-lg-9">
                            <div className="card rounded-2 profile-form">
                                <div className="card-body p-4">
                                    <div className="field-item mb-4">
                                        <div className="d-flex align-items-center gap-3 justify-content-between mb-4">
                                            <div className="card-title fw-bold fs-5">Personal Information</div>
                                            {/* <button className="btn btn-outline-secondary btn-sm rounded-2 fw-bold text-uppercase" type="submit">Edit</button> */}
                                        </div>
                                    </div>
                                        {/* Title end */}
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="field-item mb-4 w-100">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="form-floating w-100">
                                                    <input type="text" className="form-control" value={fname} onChange={(e) => setFname(e.target.value)} />
                                                    <label htmlFor="floatingInputValue">First Name</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="field-item mb-4 w-100">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="form-floating w-100">
                                                    <input type="text" className="form-control" value={lname} onChange={(e) => setLname(e.target.value)} />
                                                    <label htmlFor="floatingInputValue">Last Name</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="field-item mb-4 w-100">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="form-floating w-100">
                                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label htmlFor="floatingInputValue">Email Address</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="field-item mb-4 w-100">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="form-floating w-100">
                                                    <input type="email" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} />
                                                    <label htmlFor="floatingInputValue">Mobile Number</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="field-item mb-4 w-100">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="form-floating w-100">
                                                    <input type="email" className="form-control" value={alt_contact} onChange={(e) => setAltContact(e.target.value)} />
                                                    <label htmlFor="floatingInputValue">Alternative Number</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="field-item mb-4 w-100">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="form-floating w-100">
                                                    <textarea type="email" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                                    <label htmlFor="floatingInputValue">Address</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="field-item mb-4 w-100">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="form-floating w-100">
                                                    <input type="email" className="form-control" value={pin_code} onChange={(e) => setPincode(e.target.value)} />
                                                    <label htmlFor="floatingInputValue">Pincode</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        isLoading 
                                        ? 
                                            <button className="btn btn-primary rounded-2 fw-bold text-uppercase btn-md" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Saving...
                                            </button>
                                        : 
                                            <button className="btn btn-primary rounded-2 fw-bold text-uppercase btn-md" onClick={updateUserInfo}>Save the Changes</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>


    )
}
