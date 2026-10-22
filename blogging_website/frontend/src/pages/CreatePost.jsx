
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

const MAX_TITLE_LENGTH = 150;
const MAX_CONTENT_LENGTH = 10000;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_TAGS = 10;
const MAX_TAG_LENGTH = 30;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    category: "",
    tags: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));

    setError("");
  };

  const validateForm = () => {
    const newErrors = {};

    const title = formData.title.trim();
    const content = formData.content.trim();
    const category = formData.category.trim();

    if (!title) {
      newErrors.title = "Please enter a post title.";
    } else if (title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `Title cannot exceed ${MAX_TITLE_LENGTH} characters.`;
    }

    if (!content) {
      newErrors.content = "Please enter your post content.";
    } else if (content.length > MAX_CONTENT_LENGTH) {
      newErrors.content = `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`;
    }

    if (!formData.image) {
      newErrors.image = "Please select a featured image.";
    } else {
      if (!ALLOWED_IMAGE_TYPES.includes(formData.image.type)) {
        newErrors.image = "Only JPG, PNG, and WebP images are allowed.";
      } else if (formData.image.size > MAX_IMAGE_SIZE) {
        newErrors.image = "Image size must not exceed 5 MB.";
      } else if (formData.image.size === 0) {
        newErrors.image = "The selected image is empty.";
      }
    }

    if (!category) {
      newErrors.category = "Please enter a category.";
    } else if (category.length > 50) {
      newErrors.category = "Category cannot exceed 50 characters.";
    }

    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const uniqueTags = [
      ...new Set(tags.map((tag) => tag.toLowerCase())),
    ];

    if (uniqueTags.length > MAX_TAGS) {
      newErrors.tags = `You can add up to ${MAX_TAGS} tags.`;
    } else if (tags.some((tag) => tag.length > MAX_TAG_LENGTH)) {
      newErrors.tags = `Each tag must be ${MAX_TAG_LENGTH} characters or fewer.`;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const postData = new FormData();

      postData.append("title", formData.title.trim());
      postData.append("content", formData.content.trim());
      postData.append("category", formData.category.trim());

      const tags = [
        ...new Map(
          formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
            .map((tag) => [tag.toLowerCase(), tag]),
        ).values(),
      ];

      postData.append("tags", JSON.stringify(tags));
      postData.append("image", formData.image);

      await apiRequest("/posts", {
        method: "POST",
        body: postData,
      });

      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to publish the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (name) =>
    errors[name] ? (
      <p className="text-sm text-red-600 mt-1" role="alert">
        {errors[name]}
      </p>
    ) : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Create a Blog</h1>

      <p className="text-gray-500 mb-8">
        Share your thoughts with the Blogspace community.
      </p>

      {error && (
        <p
          className="bg-red-100 text-red-600 p-3 rounded-lg mb-5"
          role="alert"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-2">
            Title <span className="text-red-600">*</span>
          </label>

          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your post title"
            maxLength={MAX_TITLE_LENGTH}
            aria-invalid={Boolean(errors.title)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          {fieldError("title")}

          <p className="text-sm text-gray-500 mt-1">
            {formData.title.length}/{MAX_TITLE_LENGTH} characters
          </p>
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block font-medium mb-2">
            Content <span className="text-red-600">*</span>
          </label>

          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post..."
            rows={8}
            maxLength={MAX_CONTENT_LENGTH}
            aria-invalid={Boolean(errors.content)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
          />

          {fieldError("content")}

          <p className="text-sm text-gray-500 mt-1">
            {formData.content.length}/{MAX_CONTENT_LENGTH} characters
          </p>
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block font-medium mb-2">
            Featured Image <span className="text-red-600">*</span>
          </label>

          <input
            id="image"
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            aria-invalid={Boolean(errors.image)}
            className="w-full border rounded-lg px-4 py-3 bg-white"
          />

          <p className="text-sm text-gray-500 mt-1">
            JPG, PNG, or WebP. Maximum size: 5 MB.
          </p>

          {formData.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-700">
                Selected: {formData.image.name}
              </p>

              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, image: null }));
                  setErrors((prev) => ({ ...prev, image: "" }));

                  const input = document.getElementById("image");
                  if (input) input.value = "";
                }}
                className="text-sm text-red-600 underline mt-1"
              >
                Remove image
              </button>
            </div>
          )}

          {fieldError("image")}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-medium mb-2">
            Category <span className="text-red-600">*</span>
          </label>

          <input
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Technology"
            maxLength={50}
            aria-invalid={Boolean(errors.category)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          {fieldError("category")}
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block font-medium mb-2">
            Tags
          </label>

          <input
            id="tags"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="react, javascript, web development"
            aria-invalid={Boolean(errors.tags)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <p className="text-sm text-gray-500 mt-2">
            Separate tags using commas. Maximum {MAX_TAGS} unique tags.
          </p>

          {fieldError("tags")}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
