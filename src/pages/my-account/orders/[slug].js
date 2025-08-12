import Image from 'next/image';
import Link from "next/link";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// server side props
export async function getServerSideProps(context) {
    const { req } = context;
    let token = req.cookies._customer_token || null;
    let slug = context.query.slug;
    
    // fetch user data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/order_details/${slug}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(res);

    // Check if the response is valid
    if (!res.ok) {
        return {
          notFound: true,
        };
    }

    const data = await res.json();
    console.log(data);
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

export default function Slug({ data }) {

    const [orderDetails, setOrderDetails] = useState(data.orderDetails);
    const [userData, setUserData] = useState(data.userData);
    const [orderItems, setOrderItems] = useState(data.orderDetails?.order_items ? data.orderDetails?.order_items : []);

    return (
        <>
            <section class="fluid-block bg-light order-details">
                <div class="container col-lg-6 mx-auto">
                    
                    {orderItems && orderItems.map((item, index) => (
                        <div class="card border-0 shadow-sm mb-3" key={index}>
                            <div class="row g-0 align-items-center">
                                <div class="col-lg-6 col-md-6 border-right">
                                    <a href={`/shop/${item.product.slug}`} class="card cart-item border-0">
                                        <div class="card-body p-3">
                                            <div class="row align-items-center">
                                                <div class="col-lg-3 col-md-3 col-3">
                                                    <div class="img-box rounded-3 overflow-hidden form-check-label position-relative">
                                                        <img src={process.env.NEXT_PUBLIC_HOST_URL + item.product.featuredimage} alt={item.product_name} width={100} height={100}  />
                                                    </div>
                                                </div>
                                                <div class="col-lg-9 col-md-8 col-8">
                                                    <div class="card-sub-title fw-bold mb-0 text-dark d-flex align-items-center justify-content-between">
                                                        <div class="left fs-5 mb-1">{item.product_name}</div>
                                                    </div>
                                                    <div class="card-subtitle text-muted mb-1">
                                                        <div dangerouslySetInnerHTML={{ __html: item.varient }} />    
                                                    </div>                                      
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="px-4 py-3 details-info">
                                        <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2">
                                            <div class="left">
                                                <h6 class="fw-bold mb-0">Qty X Price</h6>
                                            </div>
                                            <div class="right">
                                                <h6 class="fw-bold mb-0">Total</h6>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="left">
                                                <span>{item.qty} X ₹{item.sub_total}</span>
                                            </div>
                                            <div class="right">
                                                <span class="text-dark">₹{item.grand_total}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div class="card border-0 shadow-sm mb-3">
                        <div class="card-body p-4 py-3">
                            <div class="d-flex align-items-center justify-content-between border-bottom pb-2">
                                <div class="left">
                                    <h6 class="mb-0">Sub total</h6>
                                </div>
                                <div class="right">
                                    <span class="text-success">₹{orderDetails.sub_total}</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between pt-2">
                                <div class="left">
                                    <h6 class="mb-0">Discount</h6>
                                </div>
                                <div class="right">
                                    <span>₹{orderDetails.discount}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark border-0">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="left">
                                    <h6 class="fw-bold mb-0 text-white">Grand Todal</h6>
                                </div>
                                <div class="right">
                                    <span class="text-dark fs-5 fw-bold text-white">₹{orderDetails.grand_total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card border-0 shadow-sm mb-3">
                        <div class="card-body p-4">
                            <div class="column w-100">
                                <div class="order-status confirmed">
                                    <div class="d-flex align-items-center justify-content-between gap-3 mb-1">
                                        <div class="left">
                                            {
                                                orderDetails.gateway != 'Online' && orderDetails.payment_status == '1'
                                                ? 
                                                    <span class="text-success">Confirmed</span> 
                                                : 
                                                    <span class="text-muted">Pending</span> 
                                            }
                                        </div>
                                        <div class="left"><span class="text-muted">Delivery Confirmred</span></div>
                                    </div>
                                    <div class="order-status-bar"></div>
                                    <div class="d-flex align-items-center justify-content-between gap-3 mt-1 order-date">
                                        <div class="left">
                                            <span class="text-dark">
                                                {
                                                    orderDetails.status == 2 ?
                                                        format(new Date(orderDetails.created_at), 'dd MMM yyyy')
                                                    :
                                                       'Order yet to be confirmed!'
                                                }
                                            </span>
                                        </div>
                                        <div class="left">
                                            <span class="text-dark">
                                                {
                                                    orderDetails.status >= 4 ?
                                                        format(new Date(orderDetails.upfated_at), 'dd MMM yyyy')
                                                    :
                                                        'Order will be delivered soon!'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div class="card border-0 shadow-sm mb-3">
                        <div class="card-body p-4">
                            <div class="row g-5">
                                <div class="col-lg-6 border-right">
                                    <div class="d-flex align-items-center justify-content-between mb-2">
                                        <div class="card-title fw-bold mb-0">Delivery Address</div>
                                        {/* <button class="btn btn-sm btn-outline-secondary">Change</button> */}
                                    </div>
                                    <div class="card-text address">
                                        <h6 class="fw-bold">{userData.fname} {userData.lname}</h6>
                                        <p>{orderDetails.shipping_address}</p>
                                        <p class="mb-0"><strong>Phone number:</strong> {userData.contact}</p>
                                    </div>
                                </div>
                                <div class="col-lg-6 actions">
                                    <div class="card-title mb-3 fw-bold">More Actions</div>
                                    <div class="d-flex align-items-center justify-content-between mb-2">
                                        <span>Prefer contactless delivery?</span>
                                        {orderDetails.payment_status == '1' ? <button class="btn btn-sm btn-outline-secondary border-0 shadow-sm px-3 text-success">Pay Now</button> : <span class="btn btn-sm btn-outline-secondary border-0 shadow-sm px-3 text-success bg-success">Already Paid</span>}
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                        <span>Share order details</span>
                                        <button class="btn btn-outline-secondary btn-sm border-0 shadow-sm px-3 text-success">Share Order</button>
                                    </div>
                                    <div class="d-flex align-items-center gap-3">
                                        <button class="btn btn-outline-secondary btn-sm border-0 shadow-sm px-3 py-2 text-success bg-success"><i class="bi bi-chat-square-text"></i> Chat with Us</button>
                                        <button class="btn btn-sm link-secondary"><i class="bi bi-x-circle text-danger"></i> Cancel Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card border-0 shadow-sm ratings">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="card-title fw-bold mb-2">Rate your experience with us</div>
                                <button class="btn btn-sm link-secondary"><i class="bi bi-hand-thumbs-up-fill fs-5"></i> Need Help?</button>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <div class="left text-muted">Give Your Ratings</div>
                                <div class="right text-muted">
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}