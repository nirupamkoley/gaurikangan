import SideBar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { apiRequest } from "../../../utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

// server side props
export async function getServerSideProps(context) {
    const { req } = context;
    let token = req.cookies._customer_token || null;
    
    // fetch user data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/orders/1`, {
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

export default function Orders({ data }) {

    // console.log('order data: ', data.orderList);
    const [listOfOrders, setListOfOrders] = useState(data.orderList);

    return (
        <>
            <section className="fluid-block cart profile border-bottom">
                <div className="container">
                    <div className="row col-lg-10 col-sm-12 mx-auto">
                        {/* Left Column */}
                        <SideBar userData={data.userDetails} />
                        {/* Right Column */}
                        <div className="col-lg-9">
                            <div className="card rounded-2 profile-form my-order">
                                <div className="card-body p-4">
                                    <div className="field-item">
                                        <div className="d-flex align-items-center gap-3 justify-content-between mb-4">
                                            <div className="card-title fw-bold fs-5 mb-0">My Orders</div>
                                            <div className="input-group w-50 order-item-search">
                                                {/* <input type="text" className="form-control" placeholder="Search your orders here" aria-label="Search" aria-describedby="button-addon2" />
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

                                            {listOfOrders && listOfOrders.map((order, index) => (
                                               <Link href={`/my-account/orders/${order.order_key}`} className="card cart-item mb-3" key={index}>
                                                    <div className="card-body">
                                                        <div className="row g-3">
                                                            <div className="col-lg-2 col-sm-3 col-4">
                                                                <div className="img-box rounded-0 overflow-hidden form-check-label position-relative">
                                                                    <img src={process.env.NEXT_PUBLIC_HOST_URL + order.order_items[0].product.featuredimage} alt="..." width={100} height={100} />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 col-8">
                                                                <div className="card-title fw-bold mb-0 text-dark d-flex align-items-center justify-content-between">
                                                                    <div className="left fs-5">ORDER ID: {order.order_no}</div>
                                                                </div>
                                                                <div className="price-wrap d-flex align-items-center justify-content-between gap-3 mb-2">
                                                                    <div className="left d-flex align-items-center gap-2">
                                                                        <div className="price fs-5 fw-bold">₹ {order.grand_total}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="card-text d-flex align-items-center delivery mb-1">
                                                                    <div className="delivery-status delivered">
                                                                        Order Placed on 
                                                                        <strong> {format(new Date(order.created_at), "dd MMM yyyy")}</strong>
                                                                    </div>
                                                                </div>
                                                                <div className="card-subtitle text-muted">
                                                                   <span className="text-dark">Payment Method: {order.gateway}</span><br />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                            {/* Cart item */}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
