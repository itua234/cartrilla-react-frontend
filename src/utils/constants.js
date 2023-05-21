const API_URL = "http://127.0.0.1:8080/api/v1";
export const API_ROUTES = {
    SIGN_UP: `${API_URL}/auth/register`,
    SIGN_IN: `${API_URL}/auth/login`,
    SIGN_OUT: `${API_URL}/auth/logout`,
    VERIFY_RESET_TOKEN: `${API_URL}/auth/verify/reset/token/`,
    RESET_PASSWORD: `${API_URL}/auth/password/forgot/`,
    PASSWORD_RESET: `${API_URL}/auth/password/reset/`,
    GET_USER: `${API_URL}/user/`,
    GET_STATES: `${API_URL}/user/states/`,
    UPDATE_PROFILE: `${API_URL}/user/profile/`,
    GET_PRODUCTS: `${API_URL}/product/`,
    GET_PRODUCT: `${API_URL}/product/`,
    GET_SHIPPING_ADDRESS: `${API_URL}/user/address/shipping`,
    GET_BILLING_ADDRESS: `${API_URL}/user/address/billing`,
    UPDATE_SHIPPING_ADDRESS: `${API_URL}/user/shipping/address`,
    UPDATE_BILLING_ADDRESS: `${API_URL}/user/billing/address`,
    ORDER: `${API_URL}/order/`,
    VERIFY_ORDER: `${API_URL}/order/verify/`,
}

export const APP_ROUTES = {
    SIGN_UP: "/register",
    SIGN_IN: "/login",
    DASHBOARD: "/myaccount",
}