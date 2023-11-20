import { Feedback } from "../types";

export const basePath =
    process.env.NODE_ENV === "development" ? "http://localhost:3002/" : "";
export const baseAPI =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8002/api"
        : "/api";

export const notConnectedMessage =
    "Unable to perform the task at this moment, make sure you're connected to the internet";

export const awsDirStruct = {
    profile: {
        picture: "profile/pictures",
        customData: "profile/custom_data",
    },

    campus: {
        picture: "campus/pictures",
    },

    library: {
        bookPictures: "library/books/covers",
        bookPdfs: "library/books/pdfs",
    },

    logsInfo: {
        logs: "logs",
    },
};

export const dateFormatter = Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
});

export const initialFeedback: Feedback = {
    loading: false,
    show: false,
    message: "",
};
