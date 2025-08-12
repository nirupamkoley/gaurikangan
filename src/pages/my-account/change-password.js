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

export default function ChangePassword({ data }) {

    // console.log('user data', data);
    const [user_data, setUserData] = useState(data.userDetails);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // update password
    const updatePassword = async () => {
        setIsLoading(true);
        let formData = new FormData();
        formData.append("old_password", currentPassword);
        formData.append("password", newPassword);
        formData.append("password_confirmation", confirmPassword);
        formData.append("user_id", user_data.id);

        const res = await apiRequest(process.env.NEXT_PUBLIC_API_URL + '/user/changepassword', {
            method: 'POST',
            body: formData,
        });
        if (res.success) {
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
        <div>
            <section className="fluid-block cart profile border-bottom">
                <div className="container">
                    <div className="row col-lg-10 col-sm-12 mx-auto">
                        {/* Left Column */}
                        <SideBar userData={user_data} />
                        {/* Right Column */}
                        <div className="col-lg-9">
                            <div className="card rounded-2 profile-form address-form">
                                <div className="card-body p-4">
                                    <div className="field-item mb-4">
                                        <div className="d-flex align-items-center gap-3 justify-content-between mb-4">
                                            <div className="card-title fw-bold fs-5">Change Password</div>
                                            {/* <button className="btn btn-outline-secondary btn-sm rounded-2 fw-bold text-uppercase add-btn" type="submit">Edit</button> */}
                                        </div>
                                        {/* Title end */}
                                        <form className="p-4 bg-light rounded-0 border">
                                            <div className="row g-3">
                                                <div className="col-lg-12">
                                                    <div className="form-floating">
                                                        <input type="password" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                                        <label htmlFor="Name">Old Password</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-floating">
                                                        <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                                        <label htmlFor="Mobile">New Password</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-floating">
                                                        <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                        <label htmlFor="Confirm-password">Confirm Password</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    {
                                                        isLoading ? 
                                                            <button className="btn btn-primary rounded-2 fw-bold text-uppercase btn-md mt-3" disabled>
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                Loading...
                                                            </button>
                                                        : 
                                                            <button className="btn btn-primary rounded-2 fw-bold text-uppercase btn-md mt-3" onClick={updatePassword}>Save Password</button>
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/* Address Form end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}