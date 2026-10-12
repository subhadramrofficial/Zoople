import { apiRequest } from "./api";

export const getComments = async (postId) => {
    return await apiRequest(`/comments/post/${postId}`);
};

export const addComment = async (postId, content) => {
    return await apiRequest(`/comments/post/${postId}`, {
        method: "POST",
        body: JSON.stringify({ content })
    });
};

export const deleteComment = async (commentId) => {
    return await apiRequest(`/comments/${commentId}`, {
        method: "DELETE"
    });
};