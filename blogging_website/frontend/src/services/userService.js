import { apiRequest } from "./api";

export const getUserProfile = async (id) => {
    return await apiRequest(`/users/${id}`);
};

export const updateUserProfile = async (userData) => {
    return await apiRequest("/users/profile", {
        method: "PUT",
        body: JSON.stringify(userData)
    });
};

export const getUserPosts = async (id) => {
    return await apiRequest(`/users/${id}/posts`);
};