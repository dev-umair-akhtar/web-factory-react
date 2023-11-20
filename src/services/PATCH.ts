import { notConnectedMessage } from "@/utilities/constants";
import axios from "axios";

export const PATCH = async (
    url: string,
    params: any = {},
    data: any = null
) => {
    try {
        const response = await axios.patch(
            process.env.NEXT_PUBLIC_BACKEND_HOST + url,
            data,
            {
                withCredentials: true,
                params,
            }
        );
        return [response.data, null];
    } catch (err: any) {
        return [null, err.response?.data?.message || notConnectedMessage];
    }
};
