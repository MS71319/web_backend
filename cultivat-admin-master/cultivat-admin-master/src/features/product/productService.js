import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";


const getProducts = async() => {
    const response = await axios.get(`${base_url}product/`);

    return response.data;
};

const createProduct = async (product) => {
    try {
        const response = await axios.post(`${base_url}product/`, product, config);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

const productService = {
    getProducts,
    createProduct,
};

export default productService;
