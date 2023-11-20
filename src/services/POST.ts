import axios from "axios";
import { notConnectedMessage } from "../utilities/constants";

export const POST = async (
    url: string,
    data: unknown = null,
    params: unknown = {}
) => {
    try {
        const response = await axios.post(url, data, {
            withCredentials: true,
            params,
        });
        return [response.data, null];
    } catch (err: any) {
        return [null, err.response?.data?.message || notConnectedMessage];
    }
};
