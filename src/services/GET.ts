import axios from "axios";
import { notConnectedMessage } from "../utilities/constants";

export const GET = async (url: string, params: any = {}) => {
    try {
        const response = await axios.get(url, {
            withCredentials: true,
            params,
        });
        return [response.data, null];
    } catch (err: any) {
        return [null, err.response?.data?.message || notConnectedMessage];
    }
};
