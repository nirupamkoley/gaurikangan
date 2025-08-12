import Swal from 'sweetalert2';
import { emptyCartItems } from "@/helpers/Helper";
import { apiRequest } from "@/utils/api";
import { useRazorpay } from "react-razorpay";
import Cookies from "js-cookie";

export const useRazorPayCheckout = () => {
    const { error, isLoading, Razorpay } = useRazorpay();
    const token = Cookies.get("_customer_token");

    const razorPayCheckout = (checkoutData, shippingAddressDetails) => {
        var checkoutDetails = checkoutData;
        var gatewayData = JSON.parse(checkoutData.gatewayData);
        var options = {
            description: 'shopping order',
            image: `${process.env.NEXT_PUBLIC_HOST_URL}assests/icon/logo_1.png`,
            currency: 'INR',
            key: process.env.NEXT_PUBLIC_KEY_ID,
            order_id: gatewayData.id,
            amount: gatewayData.amount_due,
            name: 'BYRAPPA',
            handler: function (res) {
                console.log(res);
                var formdata = new FormData();
                formdata.append("orderID", gatewayData.receipt);
                // formdata.append("user_id", userid);
                formdata.append("razorpay_order_id", res.razorpay_order_id);
                formdata.append("razorpay_payment_id", res.razorpay_payment_id);
                formdata.append("razorpay_signature", res.razorpay_signature);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow',
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                };
                fetch(process.env.NEXT_PUBLIC_API_URL + "/razorpaysuccess", requestOptions)
                    .then(response => { return response.json() })
                    .then(data => {
                        if (data.success == true) {
                            Swal.fire({
                                title: `<strong>Thank You!</strong>`,
                                html: `<p>${data.message}</p>`,
                                icon: 'success'
                            }).then(() => {
                                emptyCartItems();
                                // navigate(`/thankyou/${checkoutData.OrderID}`);
                                window.location.href = `/my-account/orders/${data.orderData?.order_key}`;
                            });
                        }
                    });
            },
            prefill: {
                name: `${shippingAddressDetails.fname} ${shippingAddressDetails.lname}`,
                contact: shippingAddressDetails.contact,
            },
            theme: {
                color: '#ff7400'
            }
        }
        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            console.log(response);
            Swal.fire({
                title: `<strong>Opps!</strong>`,
                html: `<p>${response.error.reason}</p>`,
                icon: 'error'
            })
        });
        rzp1.open();
    };

    return razorPayCheckout;
};

// create order api call function to razorpay api
// src/main.js

export const createRazorpayOrder = async (amount, currency, receipt, notes) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic cnpwX2xpdmVfaDgwYnNPdG8wUnJ2Ukc6bjJOdTBvSWRGTTlUYzhsSnZSYWYzUGla");
    const raw = JSON.stringify({
        "amount": amount,
        "currency": currency,
        "receipt": receipt,
        "notes": notes
    });
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://api.razorpay.com/v1/orders", requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
        return result; // Return the result
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be handled elsewhere
    }
}
