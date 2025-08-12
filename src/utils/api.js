import Cookies from "js-cookie";

export const apiRequest = async (url, options = {}) => {
    const token = Cookies.get("_customer_token");

    // Add Authorization header if token exists
    const headers = {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const requestOptions = {
        ...options,
        headers,
    };

    const response = await fetch(url, requestOptions);
    return response.json();
};
