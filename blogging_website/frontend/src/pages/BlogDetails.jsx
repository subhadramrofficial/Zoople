import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { getCurrentUser } from "../services/authService.js";
import {
  getSinglePost,
  toggleLike,
  deletePost,
  updatePost,
} from "../services/postService";
import {
  getComments,
  addComment,
  deleteComment,
} from "../services/commentService.js";

const API_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
  : "http://localhost:8000";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [commenting, setCommenting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [editErrors, setEditErrors] = useState({});
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    tags: "",
  });

  const updateEditField = (field, value) => {
    setEditData((previous) => ({ ...previous, [field]: value }));
    setEditErrors((previous) => ({ ...previous, [field]: "" }));
    setError("");
  };

  // LIKE POST
  const handleLike = async () => {
    setError("");
    try {
      await toggleLike(id);
      const data = await getSinglePost(id);
      setPost(data.post);
    } catch (err) {
      setError(err.message || "Could not like this post. Please try again.");
    }
  };

  // OPEN EDIT FORM
  const handleEditClick = () => {
    setEditData({
      title: post.title || "",
      content: post.content || "",
      image: "",
      category: post.category || "",
      tags: post.tags?.join(", ") || "",
    });
    setEditErrors({});
    setError("");
    setIsEditing(true);
  };

  // UPDATE POST
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (updating) return;

    const title = editData.title.trim();
    const content = editData.content.trim();
    const category = editData.category.trim();
    const rawTags = editData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const tags = [...new Set(rawTags)];
    const errors = {};

    if (!title) errors.title = "Please enter a title.";
    else if (title.length > 150) errors.title = "Title must be 150 characters or fewer.";

    if (!content) errors.content = "Please enter the post content.";
    else if (content.length > 10000) errors.content = "Content must be 10,000 characters or fewer.";

    if (!category) errors.category = "Please enter a category.";
    else if (category.length > 50) errors.category = "Category must be 50 characters or fewer.";

    if (rawTags.length > 10) errors.tags = "You can add up to 10 tags.";
    else if (rawTags.some((tag) => tag.length > 30)) errors.tags = "Each tag must be 30 characters or fewer.";

    if (editData.image instanceof File) {
      if (!ALLOWED_IMAGE_TYPES.includes(editData.image.type)) {
        errors.image = "Choose a JPG, PNG, or WebP image.";
      } else if (editData.image.size === 0 || editData.image.size > MAX_IMAGE_SIZE) {
        errors.image = "Image must be larger than 0 bytes and no bigger than 5 MB.";
      }
    }

    setEditErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    setUpdating(true);
    setError("");

    try {
      const postData = new FormData();
      postData.append("title", title);
      postData.append("content", content);
      postData.append("category", category);
      postData.append("tags", JSON.stringify(tags));

      if (editData.image instanceof File) {
        postData.append("image", editData.image);
      }

      const data = await updatePost(id, postData);
      setPost(data.post);
      setIsEditing(false);
      setEditErrors({});
    } catch (err) {
      setError(err.message || "Could not update the post. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  // ADD COMMENT
  const handleAddComment = async (e) => {
    e.preventDefault();
    const trimmedComment = commentText.trim();

    if (!trimmedComment) {
      setCommentError("Please enter a comment.");
      return;
    }
    if (trimmedComment.length > 500) {
      setCommentError("Comments must be 500 characters or fewer.");
      return;
    }
    if (commenting) return;

    setCommenting(true);
    setCommentError("");
    setError("");

    try {
      const data = await addComment(id, trimmedComment);
      setComments((previous) => [...previous, data.comment]);
      setCommentText("");
    } catch (err) {
      setCommentError(err.message || "Could not post your comment. Please try again.");
    } finally {
      setCommenting(false);
    }
  };

  // DELETE COMMENT
  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmed) return;

    setError("");
    try {
      await deleteComment(commentId);
      setComments((previous) => previous.filter((comment) => comment._id !== commentId));
    } catch (err) {
      setError(err.message || "Could not delete the comment. Please try again.");
    }
  };

  // DELETE POST
  const handleDeletePost = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    setError("");
    try {
      await deletePost(id);
      navigate("/");
    } catch (err) {
      setError(err.message || "Could not delete the post. Please try again.");
    }
  };

  // FETCH POST, USER, AND COMMENTS
  useEffect(() => {
    let cancelled = false;

    const fetchPost = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getSinglePost(id);
        if (cancelled) return;
        setPost(data.post);

        try {
          const userData = await getCurrentUser();
          if (!cancelled) setCurrentUser(userData.user || null);
        } catch {
          if (!cancelled) setCurrentUser(null);
        }

        try {
          const commentData = await getComments(id);
          if (!cancelled) setComments(commentData.comments || []);
        } catch (err) {
          if (!cancelled) setError(err.message || "Could not load comments.");
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Could not load this post.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPost();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col gap-4 items-center justify-center px-6">
        <p className="text-red-600">{error || "Post not found."}</p>
        <Link to="/" className="text-sm underline hover:text-gray-700">Back to Home</Link>
      </div>
    );
  }

  const isOwner = Boolean(
    currentUser?._id &&
    post.author?._id &&
    currentUser._id === post.author._id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-black transition"
        >
          ← Back to Home
        </Link>

        {error && (
          <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
            <button
              type="button"
              onClick={() => setError("")}
              className="ml-3 font-semibold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        
{post.image && (
  <div className="mt-6 w-full h-[420px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
    <img
      src={
        post.image.startsWith("http")
          ? post.image.replace(
              /^http:\/\/localhost:8000/,
              API_URL
            )
          : `${API_URL}${post.image.startsWith("/") ? "" : "/"}${post.image}`
      }
      alt={post.title || "Blog post image"}
      className="max-w-full max-h-full object-contain"
    />
  </div>
)}


        <div className="mt-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {post.category}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight break-words">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-500">
            <span>
              By <span className="font-medium text-gray-800">{post.author?.name || "Unknown Author"}</span>
            </span>
            <span>•</span>
            <span>❤️ {post.likes?.length || 0} likes</span>
          </div>

          {!isEditing && (
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                type="button"
                onClick={handleLike}
                className="border border-gray-300 bg-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
              >
                ❤️ Like
              </button>

              {isOwner && (
                <>
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="border border-gray-300 bg-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                  >
                    Edit Post
                  </button>
                  <button
                    type="button"
                    onClick={handleDeletePost}
                    className="border border-red-200 bg-white text-red-500 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 transition"
                  >
                    Delete Post
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <form
            onSubmit={handleUpdatePost}
            noValidate
            className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 space-y-5"
          >
            <div>
              <label htmlFor="edit-title" className="block font-medium mb-2">Title</label>
              <input
                id="edit-title"
                type="text"
                value={editData.title}
                maxLength={150}
                onChange={(e) => updateEditField("title", e.target.value)}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{editData.title.length}/150</p>
              {editErrors.title && <p className="text-sm text-red-600 mt-1">{editErrors.title}</p>}
            </div>

            <div>
              <label htmlFor="edit-content" className="block font-medium mb-2">Content</label>
              <textarea
                id="edit-content"
                value={editData.content}
                maxLength={10000}
                onChange={(e) => updateEditField("content", e.target.value)}
                rows={8}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-y"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{editData.content.length}/10000</p>
              {editErrors.content && <p className="text-sm text-red-600 mt-1">{editErrors.content}</p>}
            </div>

            <div>
              <label htmlFor="edit-image" className="block font-medium mb-2">Change Image</label>
              <input
                id="edit-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => updateEditField("image", e.target.files?.[0] || "")}
                className="w-full border rounded-lg px-4 py-3"
              />
              <p className="text-sm text-gray-500 mt-2">Optional. Leave empty to keep the current image. JPG, PNG, or WebP; maximum 5 MB.</p>
              {editErrors.image && <p className="text-sm text-red-600 mt-1">{editErrors.image}</p>}
              {editData.image instanceof File && (
                <button
                  type="button"
                  onClick={() => {
                    updateEditField("image", "");
                    const input = document.getElementById("edit-image");
                    if (input) input.value = "";
                  }}
                  className="mt-2 text-sm text-red-600 underline"
                >
                  Remove selected image
                </button>
              )}
            </div>

            <div>
              <label htmlFor="edit-category" className="block font-medium mb-2">Category</label>
              <input
                id="edit-category"
                type="text"
                value={editData.category}
                maxLength={50}
                onChange={(e) => updateEditField("category", e.target.value)}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{editData.category.length}/50</p>
              {editErrors.category && <p className="text-sm text-red-600 mt-1">{editErrors.category}</p>}
            </div>

            <div>
              <label htmlFor="edit-tags" className="block font-medium mb-2">Tags</label>
              <input
                id="edit-tags"
                type="text"
                value={editData.tags}
                onChange={(e) => updateEditField("tags", e.target.value)}
                placeholder="react, javascript, web development"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-sm text-gray-500 mt-2">Separate tags using commas. Up to 10 tags, 30 characters each.</p>
              {editErrors.tags && <p className="text-sm text-red-600 mt-1">{editErrors.tags}</p>}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={updating}
                className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                disabled={updating}
                onClick={() => {
                  setIsEditing(false);
                  setEditErrors({});
                  setError("");
                }}
                className="border px-5 py-3 rounded-lg hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mt-10 text-gray-700 leading-8 whitespace-pre-line text-lg break-words">
              {post.content}
            </div>

            {post.tags?.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="bg-white border border-gray-200 px-3 py-1 rounded-full text-sm text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        <section className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>

          <form onSubmit={handleAddComment} noValidate className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={commentText}
                maxLength={500}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  setCommentError("");
                }}
                placeholder="Write a comment..."
                aria-label="Write a comment"
                className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black bg-white"
              />
              <button
                type="submit"
                disabled={commenting}
                className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {commenting ? "Posting..." : "Comment"}
              </button>
            </div>
            <div className="mt-1 flex justify-between gap-3">
              {commentError ? <p role="alert" className="text-sm text-red-600">{commentError}</p> : <span />}
              <p className="text-xs text-gray-500">{commentText.length}/500</p>
            </div>
          </form>

          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => {
                const commentOwnerId = comment.user?._id || comment.user;
                const canDeleteComment = Boolean(
                  currentUser?._id &&
                  (commentOwnerId?.toString?.() === currentUser._id.toString() || isOwner)
                );

                return (
                  <div key={comment._id} className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <p className="font-medium">{comment.user?.name || "Unknown User"}</p>
                        <p className="text-gray-600 mt-1 whitespace-pre-line break-words">{comment.content}</p>
                      </div>
                      {canDeleteComment && (
                        <button
                          type="button"
                          onClick={() => handleDeleteComment(comment._id)}
                          className="shrink-0 text-red-500 text-sm hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default BlogDetails;
