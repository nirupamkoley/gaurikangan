import SideBar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { apiRequest } from "../../utils/api";
import Cookies from "js-cookie";
import { getPrice, getOtherPrice, removeFromWishList } from "../../helpers/Helper";
import Image from "next/image";
import Link from "next/link";

// server side props
export async function getServerSideProps(context) {
    const { req } = context;
    const token = req.cookies._customer_token || null;
    
    // fetch user data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/mywishlist/1`, {
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

export default function Wishlist({ data }) {
    console.log("Wishlist data", data);
    const [wishlist, setWishlist] = useState(data.wishList);
    const [userData, setUserData] = useState(data.userData);

    // handle add to wishlist
    const handleRemoveWishlistClick = async (productId) => {
        let wishlist = await removeFromWishList(productId); // Await the asynchronous function
        if (wishlist.success) {
            Swal.fire({
                icon: "success",
                title: wishlist.message[0],
            });
            setWishlist(wishlist.wishList);
        } else {
            Swal.fire({
                icon: "error",
                title: wishlist.message[0],
            });
        }
    };

    return (
        <div>
            <section className="fluid-block cart profile border-bottom">
                <div className="container">
                    <div className="row col-lg-10 col-sm-12 mx-auto">
                        {/* Left Column */}
                        <SideBar userData={userData} />
                        {/* Right Column */}
                        <div className="col-lg-9">
                            <div className="card rounded-2 profile-form my-order">
                                <div className="card-body p-4">
                                    <div className="field-item">
                                        <div className="d-flex align-items-center gap-3 justify-content-between mb-4">
                                            <div className="card-title fw-bold fs-5 mb-0">My Wishlist</div>
                                            <div className="input-group w-50 order-item-search">
                                                {/* <input type="text" className="form-control" placeholder="Search your favourite item" aria-label="Search" aria-describedby="button-addon2" />
                                                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color="#000000" fill="none">
                                                        <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                    </svg>
                                                </button> */}
                                            </div>
                                        </div>
                                        {/* Title end */}
                                        <div className="cart-items order-items">
                                            {wishlist.map((item, index) => (
                                                <div className="card cart-item mb-3" key={index}>
                                                    <div className="card-body">
                                                        <div className="row g-3">
                                                            <div className="col-lg-2 col-sm-3 col-4">
                                                                <Link href={`/shop/${item.product?.slug}`} className="img-box rounded-0 overflow-hidden form-check-label position-relative">
                                                                    <Image 
                                                                        src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.product?.featuredimage}`} 
                                                                        alt="..." 
                                                                        width={150} 
                                                                        height={150} 
                                                                        layout="responsive" 
                                                                        objectFit="cover" 
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 col-8">
                                                                <div className="card-title fw-bold mb-1 text-dark d-flex align-items-center justify-content-between">
                                                                    <Link href={`/shop/${item.product?.slug}`} className="left fs-5">
                                                                        {item.product?.name}
                                                                    </Link>
                                                                    <div className="right"><a href="#" className="text-muted" onClick={() => handleRemoveWishlistClick(item?.item_id)}><i className="bi bi-trash" /></a></div>
                                                                </div>
                                                                <div className="card-subtitle mb-2 text-muted">{item.product?.short_desc}</div>
                                                                <div className="price-wrap d-flex align-items-center gap-2 mt-2">
                                                                    <div className="left d-flex align-items-center gap-2">
                                                                        <div className="price fs-5 fw-bold">₹ {getPrice(item.product?.mrp, item.product?.discounted_price, item.product?.product_type)}</div>
                                                                        <div className="price fs-5 text-muted">₹ {getOtherPrice(item.product?.mrp, item.product?.discounted_price, item.product?.product_type)}</div>
                                                                        {/* <div className="discount-text text-danger">50% Off</div> */}
                                                                    </div>
                                                                </div>
                                                                <div className="card-text d-flex align-items-center delivery mb-1">
                                                                    <div className={`delivery-status delivered ${item.product?.stock_status == 1 ? "text-success" : "text-danger"}`}>{item.product?.stock_status == 1 ? "In Stock" : "Out of Stock"}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modal search-modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content border-0 rounded-0">
                        <div className="modal-body">
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control rounded-0" placeholder="Search your product" aria-describedby="button-addon2" />
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}