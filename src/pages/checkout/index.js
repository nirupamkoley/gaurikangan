import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiRequest } from "@/utils/api";
import { getCartItemData, remove_from_cart, addToCartPageQtyUpdate, getTotalCartItem, fetchCartData, updateCartJson } from "@/helpers/Helper";
import Swal from 'sweetalert2';
import { useCallback } from 'react'; // Import useCallback
import { useRazorPayCheckout, createRazorpayOrder } from '@/helpers/Razorpay';

export default function Checkout() { // Renamed to start with an uppercase letter

    const razorPayCheckout = useRazorPayCheckout();
    const [isLoading, setIsLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingAddress, setShippingAddress] = useState({});
    const [userData, setUserData] = useState();
    const [minOrderAmount, setMinOrderAmount] = useState(0);
    const [shippingAddressList, setShippingAddressList] = useState([]); // New state for shipping address list
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cartApiResponse, setCartApiResponse] = useState(null);
    const [discountedAmount, setDiscountedAmount] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);
    const [paymentGateway, setPaymentGateway] = useState('Online');
    const [userShippingAddressTextFormat, setUserShippingAddressTextFormat] = useState('');
    const [shippingCharge, setShippingCharge] = useState(0);

    const handleResponse = (response) => {
        console.log(response)
        setCartItems(response.newCartArray);
        updateCartJson(response.newCartArray);
        setShippingAddress(response.shippingDetails);
        setSelectedAddress(response.shippingDetails.id);
        setUserData(response.userData);
        setTotalPrice(response.totalCost);
        setMinOrderAmount(response.minOrderAmount);
        setShippingAddressList(response.allShippingAddressList); // Set the shipping address list
        setCartApiResponse(response);
        setDiscountedAmount(response.discount);
        setUserShippingAddressTextFormat(response.shippingDetails?.address + ', ' + response.shippingDetails?.area + ', ' + response.shippingDetails?.location + ', ' + response.shippingDetails?.pin_code);
        setShippingCharge(response.shippingCharges);
    };

    const applyCouponNfetchCartData = async () => {
        if (discountCode == "" || discountCode == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid coupon code!',
            });
            return false;
        }

        setIsLoading(true);
        var formdata = new FormData();
        if (selectedAddress !== null) {
            formdata.append("shipping_address_id", selectedAddress);
        }
        formdata.append("cartData", getCartItemData());
        formdata.append("couponCode", discountCode);

        const response = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/applycoupon`, {
            method: 'POST',
            body: formdata,
        });
        handleResponse(response);
        setIsLoading(false);
    };

    useEffect(() => {
        const fetchCartInfo = async () => {
            var formdata = new FormData();
            if (selectedAddress !== null) {
                formdata.append("shipping_address_id", selectedAddress);
            }
            formdata.append("cartData", getCartItemData());

            const response = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
                method: 'POST',
                body: formdata,
            });
            handleResponse(response);
        };

        fetchCartInfo();
    }, [selectedAddress]);

    // remove from cart functionality
    const removeFromCart = async (productID) => {
        remove_from_cart(productID);
        let response = await fetchCartData(selectedAddress);
        handleResponse(response);
    };

    // const handleIncrement = async (index, item) => {
    //     // add to cart (addToCart(productID, vendor_id, price, quantity, addons, specification))
    //     // addToCart(item.id, item.vendor_id, item.price, (item.quantity + 1), item.addons, item.specification);
    //     addToCartPageQtyUpdate(item.id, item.quantity + 1);

    //     let response = await fetchCartData(selectedAddress);
    //     handleResponse(response);
    // };

    // const handleDecrement = async (index, item) => {
    //     console.log('Quantity:', item.quantity - 1);

    //     if (item.quantity - 1 === 0) {
    //         remove_from_cart(item.id);
    //     } else {
    //         // addToCart(item.id, item.vendor_id, item.price, (item.quantity - 1), item.addons, item.specification);
    //         addToCartPageQtyUpdate(item.id, item.quantity - 1);
    //     }
    //     let response = await fetchCartData(selectedAddress);
    //     handleResponse(response);
    // };
    // console.log(selectedAddress)

    // change address
    const changeAddressNfetchCartData = async () => {
        let response = await fetchCartData(selectedAddress);
        handleResponse(response);
    };

    const handleCheckoutButton = async () => {
        if (totalPrice < minOrderAmount) {
            Swal.fire({
                title: '<strong>Oops!</strong>',
                html: 'Minimum order value is ₹' + minOrderAmount + '!',
                icon: 'error'
            });
            return false;
        }

        if (selectedAddress === null) {
            Swal.fire({
                title: '<strong>Oops!</strong>',
                html: 'Please select an address!',
                icon: 'error'
            });
            return false;
        }

        if (getTotalCartItem() === 0) {
            Swal.fire({
                title: '<strong>Oops!</strong>',
                html: 'Your cart is empty!',
                icon: 'error'
            });
            return false;
        }

        if (paymentGateway === null) {
            Swal.fire({
                title: '<strong>Oops!</strong>',
                html: 'Please select a payment method!',
                icon: 'error'
            });
            return false;
        }
        setIsLoading(true);

        var formdata = new FormData();
        formdata.append("cartData", getCartItemData());
        formdata.append("gateway", paymentGateway);
        formdata.append("couponCode", discountCode);
        formdata.append("shipping_address_id", selectedAddress);
        formdata.append("shipping_address", userShippingAddressTextFormat);
        formdata.append("cooking_instructions", '');
        formdata.append("wallet_amount", 0);
        formdata.append("appversion", 30);

        const response = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            method: 'POST',
            body: formdata,
        });
        setIsLoading(false);

        if (response.success == true) {
            if (paymentGateway === 'COD') {
                window.location.href = `/my-account/orders/${response.orderData?.order_key}`;
            } else {
                razorPayCheckout(response, shippingAddress);
            }
        } else {
            Swal.fire({
                title: '<strong>Oops!</strong>',
                html: 'Order has been Disabled from Admin Temporarily!',
                icon: 'error'
            });
            return false;
        }
    }


    /////  start  qty controll   
    const handleQuantityChange = async (index, item, newQuantity) => {
        if (newQuantity === 0) {
            remove_from_cart(item.id);
        } else {
            addToCartPageQtyUpdate(item.id, newQuantity);
        }

        let response = await fetchCartData(selectedAddress);
        handleResponse(response);
    };


    return (
        <div>
            <section className="fluid-block cart border-bottom">
                <div className="container">
                    <div className="row col-lg-9 col-sm-12 mx-auto g-5">
                        {/* Left Column */}
                        <div className="col-lg-8">
                            <div className="card rounded-2 address mb-2 border-0">
                                <div className="card-body d-flex align-items-center justify-content-between">
                                    <div className="left d-flex align-items-center gap-2">
                                        <div>
                                            {shippingAddress?.location && (
                                                <>
                                                    <span className="text-dark">Deliver to: <strong>{shippingAddress?.fname} {shippingAddress?.contact}</strong></span><br />
                                                    <span className="text-dark">{shippingAddress?.address}, {shippingAddress?.area} - {shippingAddress?.pin_code}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="right">
                                        <button className="btn btn-primary btn-sm rounded-2 fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#addressModal">Change Address</button>
                                    </div>
                                </div>
                            </div>
                            {/* Items Section */}
                            {/* Item Header end */}
                            <div className="cart-items">
                                {/* Cart item */}
                                {cartItems && Array.isArray(cartItems) && cartItems.map((item, index) => (
                                    <div className="card cart-item mb-3" key={index}>
                                        <div className="card-body">
                                            <div className="row g-3">
                                                <div className="col-lg-3 col-sm-3 col-4">
                                                    <label className="img-box rounded-0 overflow-hidden form-check-label position-relative">
                                                        <img src={`${process.env.NEXT_PUBLIC_HOST_URL}${item.featuredimage}`} alt={item.name} layout="responsive" width={100} height={100} />
                                                    </label>
                                                </div>
                                                <div className="col-lg-9 col-sm-9 col-8">
                                                    <div className="card-title fw-bold mb-1 text-dark d-flex align-items-center justify-content-between">
                                                        <div className="left fs-5">{item.name}</div>
                                                        <div className="right" onClick={() => removeFromCart(item.id)} style={{ cursor: 'pointer' }}>
                                                            <a href="#" className="text-dark"><i className="bi bi-x-lg" /></a>
                                                        </div>
                                                    </div>
                                                    <div className="card-subtitle mb-2 text-muted">{item.specification}</div>
                                                    <div className="price-wrap d-flex align-items-center justify-content-between gap-3 mt-2 mb-2 border-bottom zzproduct-details py-2">
                                                        <div className="left d-flex align-items-center gap-2">
                                                            <div className="price fs-5 fw-bold">₹ {item.price}</div>
                                                            {/* <div className="price fs-5 text-muted">₹ 2,599</div> */}
                                                            {/* <div className="discount-text text-danger">50% Off</div> */}
                                                        </div>
                                                        <div className="right">
                                                            {/* <div className="quantity">
                                                            <button className="minus" type="button" id="button-minus" onClick={() => handleDecrement(index, item)}>-</button>
                                                            <input type="text" className="input-box" value={item.quantity} readonly />
                                                            <button className="plus" type="button" id="button-plus" onClick={() => handleIncrement(index, item)}>+</button>
                                                        </div> */}
                                                            <div class="qty">


                                                                <select className="form-select form-select-sm rounded-2"
                                                                    aria-label="Select quantity"
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleQuantityChange(index, item, e.target.value)}
                                                                >
                                                                    {[...Array(10)].map((_, i) => (
                                                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                                                    )
                                                                    )}
                                                                </select>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    {/* <div className="card-text mb-1 d-flex align-items-center gap-1">
                                                    <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.63639 6.99013C6.84386 7.1976 6.84386 7.53397 6.63639 7.74143L5.7725 8.60533H8.27232C9.21251 8.60533 9.97949 7.84333 9.97949 6.89824C9.97949 5.95914 9.21859 5.19824 8.27949 5.19824H6.89116C6.59776 5.19824 6.35991 4.96039 6.35991 4.66699C6.35991 4.37359 6.59776 4.13574 6.89116 4.13574H8.27949C9.80539 4.13574 11.042 5.37234 11.042 6.89824C11.042 8.43232 9.79722 9.66783 8.27241 9.66783H5.77242L6.63639 10.5318C6.84386 10.7393 6.84386 11.0756 6.63639 11.2831C6.42893 11.4906 6.09256 11.4906 5.88509 11.2831L4.11426 9.51227C4.0417 9.43971 3.99452 9.35138 3.97271 9.25831C3.96352 9.21922 3.95866 9.17846 3.95866 9.13658C3.95866 9.05996 3.97488 8.98713 4.00407 8.92134C4.02519 8.87367 4.05366 8.82847 4.08949 8.78745C4.09828 8.77738 4.10745 8.76764 4.11697 8.75826L5.88509 6.99013C6.09256 6.78267 6.42893 6.78267 6.63639 6.99013Z" fill="#282C3F" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.416992 7.50033C0.416992 3.58831 3.58831 0.416992 7.50033 0.416992C11.4123 0.416992 14.5837 3.58831 14.5837 7.50033C14.5837 11.4123 11.4123 14.5837 7.50033 14.5837C3.58831 14.5837 0.416992 11.4123 0.416992 7.50033ZM7.50033 1.47949C4.17511 1.47949 1.47949 4.17511 1.47949 7.50033C1.47949 10.8255 4.17511 13.5212 7.50033 13.5212C10.8255 13.5212 13.5212 10.8255 13.5212 7.50033C13.5212 4.17511 10.8255 1.47949 7.50033 1.47949Z" fill="#282C3F" />
                                                    </svg>
                                                    <span><strong>14 days</strong> return available</span>
                                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {cartItems && !Array.isArray(cartItems) && (
                                    <div className="card cart-item mb-3">
                                        <div className="card-body">
                                            <p>No items in cart</p>
                                        </div>
                                    </div>
                                )}
                                {/* Wishlist Link */}
                                <Link href="/my-account/wishlist" className="card card-body fw-bold wishlist-link mb-3">
                                    <div className="d-flex align-items-center gap-2 justify-content-between">
                                        <div className="left d-flex align-items-center gap-2"><i className="bi bi-bookmark-check" />
                                            <span>Add more from Wishlist</span></div>
                                        <div className="right"><i className="bi bi-chevron-right" /></div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        {/* Right Column */}
                        <div className="col-lg-4">
                            <div className="right-column">
                                <div className="card border-0 rounded-0 coupones">
                                    <small className="text-muted text-uppercase fw-bold">Coupones</small>
                                    <div className="card-header d-flex align-items-center justify-content-between px-0 py-0 pt-3 border-0">
                                        <div className="left d-flex align-items-center gap-2">
                                            <i className="bi bi-tag"></i>
                                            <h5 className="card-title fw-bold mb-0">Apply Coupones</h5>
                                        </div>
                                        <div className="right">
                                            <button className="btn btn-sm btn-outline-primary rounded" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Apply</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 rounded-0 price-details">
                                    <small className="text-muted text-uppercase fw-bold py-3">Price Details ({cartItems.length} Items)</small>
                                    <div className="price-details-item d-flex align-items-center justify-content-between px-0 py-1">
                                        <div className="left">Subtotal</div>
                                        <div className="right"><span>₹</span>{cartApiResponse && cartApiResponse.totalCost + discountedAmount}</div>
                                    </div>
                                    <div className="price-details-item d-flex align-items-center justify-content-between px-0 py-1">
                                        <div className="left">Discount Applied</div>
                                        <div className="right text-success">- <span>₹</span>{discountedAmount}</div>
                                    </div>
                                    <div className="price-details-item d-flex align-items-center justify-content-between px-0 py-1">
                                        <div className="left">Shipping Fee</div>
                                        <div className="right"><span className="text-success">{shippingCharge}</span></div>
                                    </div>
                                    <div className="price-details-item d-flex align-items-center justify-content-between px-0 py-3 mt-2 border-top border-bottom">
                                        <div className="left fw-bold">Total Amount</div>
                                        <div className="right fw-bold"><span>₹</span>{cartApiResponse && (cartApiResponse.totalCost + parseInt(shippingCharge))}</div>
                                    </div>
                                    {/* Payment Methods */}
                                    <div className="payment-methods px-0 py-3 mb-3">
                                            <div className="mb-3"><small className="text-muted text-uppercase fw-bold">Choose Payment Mode</small></div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gateway" id="flexRadioDefault1" checked={paymentGateway === 'COD'} onChange={() => setPaymentGateway('COD')} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Cash On Delivery (COD)
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gateway" id="flexRadioDefault2" checked={paymentGateway === 'Online'} onChange={() => setPaymentGateway('Online')} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    Online Payment
                                                </label>
                                            </div>
                                    </div>
                                    {
                                        isLoading ?
                                            <button className="btn btn-primary btn-block btn-sm fw-bold" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Place Order
                                            </button>
                                            :
                                            <button className="btn btn-primary btn-block btn-sm fw-bold" type="button" onClick={() => handleCheckoutButton()}>Place Order</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Coupone Modal */}
                    <div className="modal fade coupone-modal" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Apply Coupone</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body p-0">
                                    <div className="input-group mb-2 p-3 check-coupon">
                                        <input type="text" className="form-control" placeholder="Enter coupon code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
                                        {/* <button className="btn btn-sm btn-outline-secondary" type="button">Check</button> */}
                                    </div>

                                    {/* <div className="p-3 checkbox mb-2">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" defaultValue id="checkcoupone" defaultChecked />
                                        <label className="form-check-label" htmlFor="checkcoupone">
                                            <div className="badge text-danger p-2">SAVINGSPLUS</div>
                                        </label>
                                    </div>
                                    <div className="fw-bold pt-2 px-4 mb-1">Save ₹301</div>
                                    <div className="text-muted px-4 fs-sm">30% off on minimum purchase of Rs. 1000 .</div>
                                    <div className="text-muted px-4 fs-sm">Expires on: <span>30th April 2025</span></div>
                                </div> */}

                                </div>
                                <div className="modal-footer d-flex justify-content-between align-items-center">
                                    <div className>
                                        <div className="fw-bold">Maximum Savings:<br /> <span className="text-danger">₹ {discountedAmount}</span></div>
                                    </div>
                                    {
                                        isLoading ?
                                            <button className="btn btn-primary btn-sm w-50" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Applying Discount...
                                            </button>
                                            :
                                            <button type="button" className="btn btn-primary btn-sm w-50" onClick={applyCouponNfetchCartData}>Apply</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Address Modal */}
                    <div className="modal fade coupone-modal address-modal" id="addressModal" tabIndex={-1} aria-labelledby="addressModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Select Delivery Address</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body p-0">
                                    {/* <div className="input-group p-3 check-coupon">
                                    <input type="text" className="form-control" placeholder="Enter pincode" aria-describedby="button-addon2" />
                                    <button className="btn btn-sm btn-outline-secondary text-muted" type="button" id="button-addon2">Check</button>
                                </div> */}
                                    <div className="py-3 px-3 d-flex align-items-center justify-content-between">
                                        <small className="text-muted fw-bold text-uppercase">Saved Address</small>
                                        <button onClick={() => { window.location.href = "/my-account/address"; }} data-bs-dismiss="modal" aria-label="Close" className="add-address fw-bold text-danger">
                                            <i className="bi bi-plus" /> Add New Address
                                        </button> {/* Replaced <a> with <Link> */}
                                    </div>
                                    {shippingAddressList && shippingAddressList.map((address, index) => (
                                        <div className="p-3 checkbox mb-2" key={index}>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name='shipping_address' checked={selectedAddress === address?.id} onChange={() => setSelectedAddress(address?.id)} />
                                                <label className="form-check-label d-flex align-items-center justify-content-between" htmlFor="checkcoupone">
                                                    <div className="left">
                                                        <div className="badge text-danger p-1">Address: {address?.location}</div>
                                                    </div>
                                                    {/* <div className="right">
                                                    <button className="btn btn-outline-secondary btn-sm rounded" type="button">Edit</button>
                                                    <button className="btn btn-outline-primary btn-sm rounded" type="button"><i className="bi bi-trash" /></button>
                                                </div> */}
                                                </label>
                                            </div>
                                            <div className="fw-bold pt-2 px-4 mb-1">{address?.fname} {address?.lname}</div>
                                            <div className="text-muted px-4 fs-sm mb-2">{address?.address} {address?.area} - {address?.pin_code}</div>
                                            <div className="text-muted px-4 fs-sm">Mobile: <strong className="text-dark">{address?.contact} / {address?.alt_contact}</strong></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary btn-sm w-100" onClick={changeAddressNfetchCartData} >Change Address</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}