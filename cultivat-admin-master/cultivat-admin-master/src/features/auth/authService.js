import axios from "axios";
import { base_url } from "../../utils/base_url";
const getTokenFromLocalStorage = localStorage.getItem("user")? JSON.parse(localStorage.getItem('user')): null;


const login = async (userData) => {
    try {
        console.log('Constructed URL:', `${base_url}user/admin-login`);
        const response = await axios.post(`${base_url}user/admin-login`, userData);
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        // Handle errors (e.g., log them or return a specific error message)
        console.error("Login request error:", error);
        throw error; // Propagate the error for handling in the caller function
    }
};
const getOrders = async () => {
    const response = await axios.get(`${base_url}user/get-orders`);

    return response.data;
};

const authService = {
    login,
    getOrders,
};

export default authService;