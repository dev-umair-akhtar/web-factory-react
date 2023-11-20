import { notConnectedMessage } from "@/utilities/constants";
import axios from "axios";

export const DELETE = async (url: string, id: number) => {
    try {
        const response = await axios.delete(
            process.env.NEXT_PUBLIC_BACKEND_HOST + url,
            {
                withCredentials: true,
                params: { id },
            }
        );
        return [response.data, null];
    } catch (err: any) {
        return [null, err.response?.data?.message || notConnectedMessage];
    }
};
