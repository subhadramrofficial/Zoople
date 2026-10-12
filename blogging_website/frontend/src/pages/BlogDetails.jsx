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

const API_URL = "http://localhost:8000";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    tags: "",
  });

  // ---------------- LIKE POST ----------------

  const handleLike = async () => {
    try {
      await toggleLike(id);

      const data = await getSinglePost(id);
      setPost(data.post);
    } catch (error) {
      setError(error.message);
    }
  };

  // ---------------- EDIT POST ----------------

  const handleEditClick = () => {
    setEditData({
      title: post.title,
      content: post.content,
      image: "",
      category: post.category,
      tags: post.tags?.join(", ") || "",
    });

    setIsEditing(true);
  };

  // ---------------- UPDATE POST ----------------

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    try {
      const postData = new FormData();

      postData.append("title", editData.title);
      postData.append("content", editData.content);
      postData.append("category", editData.category);

      postData.append(
        "tags",
        JSON.stringify(
          editData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== ""),
        ),
      );

      if (editData.image instanceof File) {
        postData.append("image", editData.image);
      }

      const data = await updatePost(id, postData);

      setPost(data.post);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // ---------------- ADD COMMENT ----------------

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    try {
      const data = await addComment(id, commentText);

      setComments((prevComments) => [...prevComments, data.comment]);

      setCommentText("");
    } catch (error) {
      setError(error.message);
    }
  };

  // ---------------- DELETE COMMENT ----------------

 const handleDeleteComment = async (commentId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this message?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteComment(commentId);

    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  } catch (error) {
    setError(error.message)
  }
};

  // ---------------- DELETE POST ----------------

  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // ---------------- FETCH POST ----------------

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getSinglePost(id);
        console.log("Post:", data);

        setPost(data.post);
        const userData = await getCurrentUser();
        setCurrentUser(userData.user);

        console.log("Current User:", userData.user);
        console.log("Post Author:", data.post.author);

        const commentData = await getComments(id);
        console.log("Comments:", commentData);

        setComments(commentData.comments || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // ---------------- LOADING ----------------

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading post...</p>
      </div>
    );
  }

  // ---------------- ERROR ----------------

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // ---------------- POST NOT FOUND ----------------

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Post not found.</p>
      </div>
    );
  }

  const isOwner = currentUser?._id === post.author?._id;

  // ---------------- PAGE ----------------

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* BACK TO HOME */}

        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-black transition"
        >
          ← Back to Home
        </Link>

        {/* FEATURED IMAGE */}

        {post.image && (
          <div className="mt-6 w-full h-[420px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={`${API_URL}${post.image}`}
              alt={post.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}

        {/* POST HEADER */}

        <div className="mt-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {post.category}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-500">
            <span>
              By{" "}
              <span className="font-medium text-gray-800">
                {post.author?.name || "Unknown Author"}
              </span>
            </span>

            <span>•</span>

            <span>❤️ {post.likes?.length || 0} likes</span>
          </div>

          {/* ACTION BUTTONS */}

          {!isEditing && (
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleLike}
                className="border border-gray-300 bg-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
              >
                ❤️ Like
              </button>

              {isOwner && (
                <>
                  <button
                    onClick={handleEditClick}
                    className="border border-gray-300 bg-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                  >
                    Edit Post
                  </button>

                  <button
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

        {/* ================= EDIT FORM ================= */}

        {isEditing ? (
          <form
            onSubmit={handleUpdatePost}
            className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 space-y-5"
          >
            {/* TITLE */}

            <div>
              <label className="block font-medium mb-2">Title</label>

              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* CONTENT */}

            <div>
              <label className="block font-medium mb-2">Content</label>

              <textarea
                value={editData.content}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    content: e.target.value,
                  })
                }
                rows="8"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
                required
              />
            </div>

            {/* IMAGE */}

            <div>
              <label className="block font-medium mb-2">Change Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    image: e.target.files[0],
                  })
                }
                className="w-full border rounded-lg px-4 py-3"
              />

              <p className="text-sm text-gray-500 mt-2">
                Leave empty if you want to keep the current image.
              </p>
            </div>

            {/* CATEGORY */}

            <div>
              <label className="block font-medium mb-2">Category</label>

              <input
                type="text"
                value={editData.category}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    category: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* TAGS */}

            <div>
              <label className="block font-medium mb-2">Tags</label>

              <input
                type="text"
                value={editData.tags}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    tags: e.target.value,
                  })
                }
                placeholder="react, javascript, web development"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              <p className="text-sm text-gray-500 mt-2">
                Separate tags using commas.
              </p>
            </div>

            {/* FORM BUTTONS */}

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="border px-5 py-3 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* ================= POST CONTENT ================= */}

            <div className="mt-10 text-gray-700 leading-8 whitespace-pre-line text-lg">
              {post.content}
            </div>

            {/* TAGS */}

            {post.tags?.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white border border-gray-200 px-3 py-1 rounded-full text-sm text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        {/* ================= COMMENTS ================= */}

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>

          {/* COMMENT FORM */}

          <form onSubmit={handleAddComment} className="flex gap-3 mb-8">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black bg-white"
            />

            <button
              type="submit"
              className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
            >
              Comment
            </button>
          </form>

          {/* COMMENTS LIST */}

          {comments.length === 0 ? (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {comment.user?.name || "Unknown User"}
                      </p>

                      <p className="text-gray-600 mt-1">{comment.content}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
