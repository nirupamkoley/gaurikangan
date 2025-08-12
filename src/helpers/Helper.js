import Cookies from "js-cookie";
import Swal from "sweetalert2";
import AppContext from "../utils/AppContext";

export function getPrice(mrp, discountedAmount, productType) {
    if (productType == 1) {
        if (((discountedAmount != null) && (discountedAmount != '')) && (parseInt(mrp) > parseInt(discountedAmount))) {
            if (discountedAmount != null && discountedAmount != '' && discountedAmount > 0) {
                return discountedAmount && discountedAmount;
            }else{
                return mrp && mrp;
            }
        } else {
            return mrp && mrp;
        }
    } else {
        let mrpJson = typeof mrp == 'string' && JSON.parse(mrp);
        let discountedAmountJson = typeof discountedAmount == 'string' && JSON.parse(discountedAmount);

        if (((discountedAmountJson[0] != null) && (discountedAmountJson[0] != '')) && (parseInt(mrpJson[0]) > parseInt(discountedAmountJson[0]))) {
            if (discountedAmountJson[0] != null) {
                return discountedAmountJson[0] && discountedAmountJson[0];
            }
        } else {
            return mrpJson[0] && mrpJson[0];
        }
    }
}

export function getSimplePriceOnly(mrp, discountedAmount) {
    console.log('mrp', mrp);
    // if (productType == 1) {
    if (((discountedAmount != null) && (discountedAmount != '')) && (parseInt(mrp) > parseInt(discountedAmount))) {
        if (discountedAmount != null && discountedAmount != '' && discountedAmount > 0) {
            return discountedAmount && discountedAmount;
        }else{
            return mrp && mrp;
        }
    } else {
        return mrp && mrp;
    }
    // }
}

export function getSimpleDiscountPrice(mrp, discountedAmount) {
    console.log('discountedAmount', discountedAmount);
    if (((discountedAmount != null) && (discountedAmount != '')) && (parseInt(mrp) > parseInt(discountedAmount))) {
        if (discountedAmount != null && discountedAmount != '' && discountedAmount > 0) {
            return discountedAmount && discountedAmount;
        }else{
            return 0;
        }
    } else {
        return 0;
    }
}

export function getOtherPrice(mrp, discountedAmount, productType) {
    if (productType == 1) {
        if (((discountedAmount != null) && (discountedAmount != '')) && (parseInt(mrp) > parseInt(discountedAmount))) {
            return mrp && mrp;
        } else {
            if (discountedAmount != null) {
                return discountedAmount && discountedAmount;
            }
        }
    } else {
        let mrpJson = typeof mrp == 'string' && JSON.parse(mrp);
        let discountedAmountJson = typeof discountedAmount == 'string' && JSON.parse(discountedAmount);

        if (((discountedAmountJson[0] != null) && (discountedAmountJson[0] != '')) && (parseInt(mrpJson[0]) > parseInt(discountedAmountJson[0]))) {
            return mrpJson[0] && mrpJson[0];
        } else {
            if (discountedAmountJson[0] != null) {
                return discountedAmountJson[0] && discountedAmountJson[0];
            }
        }
    }
}

export function stringToJson(text) {
    let jsonData = typeof text == 'string' && JSON.parse(text);
    return jsonData;
}

export function getSpecificationCost(mrp, discountedAmount, productType, index = null) {
    if (productType == 2) {
        let mrpJson = typeof mrp == 'string' && JSON.parse(mrp);
        let discountedAmountJson = typeof discountedAmount == 'string' && JSON.parse(discountedAmount);

        if (((discountedAmountJson[index] != null) && (discountedAmountJson[index] != '')) && (parseInt(mrpJson[index]) > parseInt(discountedAmountJson[index]))) {
            if (discountedAmountJson[index] != null) {
                return discountedAmountJson[index];
            }else{
                return mrpJson[index];
            }
        } else {
            return mrpJson[index];
        }
    }else{
        if (((discountedAmount != null) && (discountedAmount != '')) && (parseInt(mrp) > parseInt(discountedAmount))) {
            if (discountedAmount != null) {
                return discountedAmount;
            }else{
                return mrp;
            }
        } else {
            return mrp;
        }
    }
}

export function getSpecificationOtherCost(mrp, discountedAmount, productType, index = null) {
    if (productType == 1) {
        if (((discountedAmount != null) && (discountedAmount != '')) && (parseInt(mrp) > parseInt(discountedAmount))) {
            return mrp;
        } else {
            if (discountedAmount != null) {
                return discountedAmount;
            }else{
                return "";
            }
        }
    } else {
        let mrpJson = typeof mrp == 'string' && JSON.parse(mrp);
        let discountedAmountJson = typeof discountedAmount == 'string' && JSON.parse(discountedAmount);

        if (((discountedAmountJson[index] != null) && (discountedAmountJson[index] != '')) && (parseInt(mrpJson[index]) > parseInt(discountedAmountJson[index]))) {
            return mrpJson[index];
        } else {
            if (discountedAmountJson[index] != null) {
                return discountedAmountJson[index];
            }else{
                return "";
            }
        }
    }
}

export function getAvailableStock(availableStock, productType, index = null) {
    if (productType == 1) {
        return parseInt(availableStock);
    } else {
        let availableStockJson = typeof availableStock == 'string' && JSON.parse(availableStock);
        if (availableStockJson[index] != null) {
            return parseInt(availableStockJson[index]);
        }else{
            return 0;
        }
    }
}

export function addToCart(productID, vendor_id, price, quantity, addons, specification){
    if(quantity == null || quantity < 1){
        return false;
    }
    var current_data = { 
        "id": productID, 
        "quantity": quantity, 
        "vendor_id": vendor_id, 
        "price": price, 
        "product_price": price, 
        "specification": specification, 
        "addons" : addons
    };
    var existing_data = localStorage.getItem("_customer_cart");
    if (existing_data == null || existing_data == "[]") {
        existing_data = [];
        existing_data.push(current_data);
        localStorage.setItem("_customer_cart", JSON.stringify(existing_data));
    } else {
        remove_from_cart(productID);
        existing_data = localStorage.getItem("_customer_cart");
        existing_data = JSON.parse(existing_data);
        existing_data.push(current_data);
        localStorage.setItem("_customer_cart", JSON.stringify(existing_data));
    }
    AppContext.totalCartItems = existing_data.length;
    console.log(AppContext.totalCartItems);
}

export function addToCartPageQtyUpdate(productID, quantity){
    if(quantity == null || quantity < 1){
        return false;
    }
    console.log(quantity)
    var existing_data = localStorage.getItem("_customer_cart");
    existing_data = JSON.parse(existing_data);
    if (existing_data != null && existing_data != "[]") {
        for (var i = 0; i < existing_data.length; i++) {
            // if product exist in cart update quantity
            if (existing_data[i].id == productID) {
                existing_data[i].quantity = quantity;
                // break;
            }
        }
    }
    localStorage.setItem("_customer_cart", JSON.stringify(existing_data));
    AppContext.totalCartItems = existing_data.length;
    // console.log(AppContext.totalCartItems);
}

export function remove_from_cart(productID) {
    var all_data = localStorage.getItem("_customer_cart");
    all_data = JSON.parse(all_data);
    var single_data;
    var new_data = [];
    for (var i = 0; i < all_data.length; i++) {
        single_data = all_data[i];
        if (productID == single_data.id) {
            continue;
        }
        new_data.push(single_data);
        //console.log(single_data.id);
    }
    //console.log(JSON.stringify(new_data));
    localStorage.setItem("_customer_cart", JSON.stringify(new_data));
    AppContext.totalCartItems = new_data.length;
}

export function cartStockUpdate(productID, newStock) {
    var all_data = localStorage.getItem("_customer_cart");
    all_data = JSON.parse(all_data);
    var single_data;
    var new_data = [];
    for (var i = 0; i < all_data.length; i++) {
        single_data = all_data[i];
        if (productID == single_data.id) {
            if(parseInt(single_data.availableStock) >= parseInt(newStock) && (parseInt(newStock) > 0)){
                single_data.quantity = newStock;
            }else if(parseInt(newStock) < 1){
                continue;
            }
        }
        new_data.push(single_data);
        //console.log(single_data.id);
    }
    //console.log(JSON.stringify(new_data));
    localStorage.setItem("_customer_cart", JSON.stringify(new_data));
    AppContext.totalCartItems = new_data.length;
}

export function getTotalCartItem(){
    var all_data = localStorage.getItem("_customer_cart");
    if (all_data == null || all_data == "[]") {
        return 0
    }else{
        all_data = JSON.parse(all_data);
        return all_data.length;
    }
}

export function getCartItemData(){
    var all_data = localStorage.getItem("_customer_cart");
    return all_data;
}

export function emptyCartItems(){
    localStorage.removeItem("_customer_cart");
    AppContext.totalCartItems = 0;
}

export function updateCartJson(cartJson){
    localStorage.removeItem("_customer_cart");
    localStorage.setItem("_customer_cart", JSON.stringify(cartJson));
    AppContext.totalCartItems = cartJson.length;
}

export function orderStatus(status){
    if(status == 1){
        return 'Placed';
    }else if(status == 2){
        return 'Processed';
    }else if(status == 3){
        return 'Shipped';
    }else if(status == 4){
        return 'Delivered';
    }else if(status == 5){
        return 'Cancelled';
    }else if(status == 6){
        return 'Returned';
    }else{
        return 'Cancelled';
    }
}

export function orderStatusClass(status){
    if(status == 1){
        return 'expected';
    }else if(status == 2){
        return 'expected';
    }else if(status == 3){
        return 'expected';
    }else if(status == 4){
        return 'delevered';
    }else if(status == 5){
        return 'cancel';
    }else if(status == 6){
        return 'cancel';
    }else{
        return 'cancel';
    }
}

export function getPriceRange(mrp, discountedAmount, productType) {
    if (productType == 1) {
        let price = getPrice(mrp, discountedAmount, productType);
        let discountedPrice = getOtherPrice(mrp, discountedAmount, productType);
        return <>
            <strong>{price}</strong> <small style={{color:'#8f8b8b'}}>{discountedPrice}</small>
        </>;
    } else {
        let mrpJson = typeof mrp == 'string' && JSON.parse(mrp);
        let sortedMrp = mrpJson.sort();
        let discountedAmountJson = typeof discountedAmount == 'string' && JSON.parse(discountedAmount);
        var nums = discountedAmountJson.map(function(str) {
            return parseInt(str); 
        });

        let sortedDiscountedrate = nums.sort((a, b) => a-b);
        console.log(sortedDiscountedrate);
        let lastIndex = (sortedMrp.length - 1);

        if (((sortedDiscountedrate[0] != null) && (sortedDiscountedrate[0] != '')) && (mrpJson[0] > sortedDiscountedrate[0])) {
            if (sortedDiscountedrate[0] != null) {
                return sortedDiscountedrate[0] && <><strong>₹ {sortedDiscountedrate[0]} - {sortedDiscountedrate[lastIndex]} </strong></>;
            }
        } else {
            return sortedMrp[0] && <><strong>₹ {sortedMrp[0]} - {sortedMrp[lastIndex]} </strong></>;
        }
    }
}

export function getCurrency(){
    return '₹'
}

export function orderCancelable(status){
    if(status == 1){
        return true;
    }else if(status == 2){
        return true;
    }else if(status == 3){
        return true;
    }else if(status == 4){
        return false;
    }else if(status == 5){
        return false;
    }else if(status == 6){
        return false;
    }else{
        return false;
    }
}

export function orderReturnable(status){
    if(status == 1){
        return false;
    }else if(status == 2){
        return false;
    }else if(status == 3){
        return false;
    }else if(status == 4){
        return true;
    }else if(status == 5){
        return false;
    }else if(status == 6){
        return false;
    }else{
        return false;
    }
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${day}-${month}-${year} at ${hours}:${minutes} ${ampm}`;
}

export async function addToWishList(id) {
    const token = Cookies.get('_customer_token');
    // api url: AppContext.apiUrl
    // set form data
    const formData = new FormData();
    formData.append('item_id', id);

    // Set request headers
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add Authorization header if token exists
    };

    // set request options
    const requestOptions = {
        method: 'POST',
        body: formData,
        headers,
        redirect: 'follow'
    };
    // Make API call
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/user/add_to_wishlist",
        requestOptions
    );
    const data = await response.json();
    return data;
}

export async function removeFromWishList(id) {
    const token = Cookies.get('_customer_token');
    // api url: AppContext.apiUrl
    // set form data
    const formData = new FormData();
    formData.append('item_id', id);

    // Set request headers
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add Authorization header if token exists
    };

    // set request options
    const requestOptions = {
        method: 'POST',
        body: formData,
        headers,
        redirect: 'follow'
    };
    // Make API call
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/user/remove_from_wishlist",
        requestOptions
    );
    const data = await response.json();
    return data;
}

export function isStoreOpen(openTime, closeTime, online_status) {
    if(online_status == 2){
        return false;
    }else{
        return true;
    }
    if (typeof openTime !== 'string' || typeof closeTime !== 'string') {
        console.log(openTime, closeTime);
        console.error('Invalid input: openTime and closeTime should be strings in "HH:MM" format.');
        return false;
    }

    const now = new Date();
    const [openHour, openMinute] = openTime.split(':').map(Number);
    const [closeHour, closeMinute] = closeTime.split(':').map(Number);

    const openDate = new Date(now);
    openDate.setHours(openHour, openMinute, 0);

    const closeDate = new Date(now);
    closeDate.setHours(closeHour, closeMinute, 0);

    return now >= openDate && now <= closeDate;
};


export function complaintStatus(status){
    if(status == 1){
        return 'Opened';
    }else if(status == 2){
        return 'Under Process';
    }else {
        return 'Resolved';
    }
}

export function calculateDiscountPercentage(showSellingPrice, showDiscountPrice) {
    // Calculate the price difference.
    const priceDifference = showDiscountPrice - showSellingPrice;
  
    // Calculate the discount percentage.
    const discountPercentage = (priceDifference / showDiscountPrice) * 100;
  
    // Limit the decimal value to 2 places
    const roundedDiscountPercentage = parseFloat(discountPercentage.toFixed(2));

    // Return the rounded discount percentage.
    return roundedDiscountPercentage;
}

export function getSku(productSku, index){
    let productSkuJson = typeof productSku == 'string' && JSON.parse(productSku);
    return productSkuJson[index];
}


export async function fetchCartData(shipping_address_id) {
    const token = Cookies.get('_customer_token');
    var all_data = localStorage.getItem("_customer_cart");
    // set form data
    var formdata = new FormData();
    if (shipping_address_id !== null) {
        formdata.append("shipping_address_id", shipping_address_id);
    }
    formdata.append("cartData", all_data);
    
    // Set request headers
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add Authorization header if token exists
    };

    // set request options
    const requestOptions = {
        method: 'POST',
        body: formdata,
        headers,
        redirect: 'follow'
    };
    // Make API call
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/cart",
        requestOptions
    );
    const data = await response.json();
    return data;
}
