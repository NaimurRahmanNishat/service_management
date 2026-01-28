// src/utils/getBaseUrl.ts

export const getBaseUrl = () => {
    return import.meta.env.NODE_ENV === "development" ? "http://localhost:5000" : "http://localhost:5000";
};

