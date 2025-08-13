import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useState } from 'react';

export default function SideBar({ userData = { fname: '', lname: '', contact: '' } }) {

    // logout function and remove token from cookies
    const logout = () => {
        Cookies.remove("_customer_token");
        window.location.href = "/auth/login";
    }

    return (
        <>
            {/* Left Column */}
            <div className="col-lg-3">
                <div className="left-nav">
                    <div className="card rounded-2 mb-3 overflow-hidden">
                        <div className="card-header py-3 border-0">
                            <div className="d-flex align-items-center gap-3 justify-content-between">
                                <div className="left d-flex align-items-center gap-3">
                                        {/* <Image src="/assets/images/profile-pic-male.svg" className="card-img-top" alt="byrappa" width={50} height={50} /> */}

                                    <div className="zprofile-pic">
                                        <Image src="/assets/images/profile-pic-male.svg" className="zcard-img-top" alt="gouri-kangan" width={50} height={50} />
                                    </div>
                                    <div className="details">
                                        <h5 className="card-title mb-0 fw-bold">{userData.fname ? userData.fname : ''} {userData.lname ? userData.lname : ''}</h5>
                                        <small className="card-text">{userData.contact ? userData.contact : ''}</small>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className='account-toggle-mob'>
                                        <button className="btn" id='account-toggle'><i class="bi bi-chevron-down"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* User end */}
                    <div className="card rounded-2 mb-3 menu-items">
                        <div className="card-body px-0 menu-item border-bottom">
                            <div className="card-title d-flex align-items-center gap-3 fw-bold mb-3 px-3">
                                <i className="bi bi-person" /> <small className="fw-bold text-uppercase text-muted">Account Settings</small>
                            </div>
                            <ul>
                                <li><Link href="/my-account/profile">Profile Information</Link></li>
                                <li><Link href="/my-account/address">Manage Address</Link></li>
                                <li><Link href="/my-account/change-password">Change Password</Link></li>
                            </ul>
                        </div>
                        <Link href="/my-account/orders" className="card-body px-0 menu-item border-bottom menu-link active">
                            <div className="card-title d-flex align-items-center justify-content-between mb-0 gap-3 fw-bold px-3">
                                <div className="left d-flex align-items-center gap-3">
                                    <i className="bi bi-box-seam" /> <small className="fw-bold text-uppercase text-muted">My Orders</small>
                                </div>
                                <div className="right">
                                    <i className="bi bi-chevron-right" />
                                </div>
                            </div>
                        </Link>
                        <div className="card-body px-0 menu-item border-bottom">
                            <div className="card-title d-flex align-items-center gap-3 fw-bold mb-3 px-3">
                                <i className="bi bi-person" /> <small className="fw-bold text-uppercase text-muted">My Stuff</small>
                            </div>
                            <ul>
                                {/* <li><a href="coupones.html">My Coupones</a></li> */}
                                {/* <li><a href="my-reviews.html">My Reviews &amp; Retings</a></li> */}
                                {/* <li><a href="/my-account/notifications">All Notifications</a></li> */}
                                <li><Link href="/my-account/wishlist">My Wishlist</Link></li>
                            </ul>
                        </div>
                        <a href="#" className="card-body px-0 menu-item border-bottom menu-link" onClick={() => logout()}>
                            <div className="card-title d-flex align-items-center justify-content-between mb-0 gap-3 fw-bold px-3">
                                <div className="d-flex align-items-center gap-3">
                                    <i className="bi bi-power" /> <small className="fw-bold text-uppercase text-muted">Logout</small>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}