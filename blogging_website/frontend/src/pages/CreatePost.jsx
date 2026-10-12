import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    category: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const postData = new FormData();

      postData.append("title", formData.title);
      postData.append("content", formData.content);
      postData.append("category", formData.category);
      postData.append(
        "tags",
        JSON.stringify(
          formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== ""),
        ),
      );

      if (formData.image) {
        postData.append("image", formData.image);
      }

      await apiRequest("/posts", {
        method: "POST",
        body: postData,
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Create a Blog</h1>

      <p className="text-gray-500 mb-8">
        Share your thoughts with the Blogspace community.
      </p>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-5">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-2">Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your post title"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-2">Content</label>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post..."
            rows="8"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-2">Featured Image</label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.files[0],
              })
            }
            className="w-full border rounded-lg px-4 py-3 bg-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-2">Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Technology"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-2">Tags</label>

          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="react, javascript, web development"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <p className="text-sm text-gray-500 mt-2">
            Separate tags using commas.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
