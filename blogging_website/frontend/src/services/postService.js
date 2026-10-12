import { apiRequest } from "./api";

export const getAllPosts = async () => {
    return await apiRequest("/posts");
};

export const getSinglePost = async (id) => {
    return await apiRequest(`/posts/${id}`);
};

export const toggleLike = async (id) => {
    return await apiRequest(`/posts/${id}/like`, {
        method: "POST"
    });
};

export const deletePost = async (id) => {
    return await apiRequest(`/posts/${id}`, {
        method: "DELETE"
    });
};
export const updatePost = async (id, postData) => {
    return await apiRequest(`/posts/${id}`, {
        method: "PUT",
        body: postData
    });
};