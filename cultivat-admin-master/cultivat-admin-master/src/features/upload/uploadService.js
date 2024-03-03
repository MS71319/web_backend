import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const uploadImg = async (data) => {
    try {
        console.log("Sending upload request with data:", data);
        const response = await axios.post(`${base_url}upload`, data, config);
        console.log("Upload response:", response);
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};



const uploadService = {
    uploadImg,
};

export default uploadService;
