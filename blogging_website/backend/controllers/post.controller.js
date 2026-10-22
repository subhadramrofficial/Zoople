import Post from "../models/post.model.js";

const MAX_TITLE_LENGTH = 150;
const MAX_CONTENT_LENGTH = 10000;
const MAX_CATEGORY_LENGTH = 50;
const MAX_TAGS = 10;
const MAX_TAG_LENGTH = 30;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const parseTags = (rawTags) => {
  if (rawTags === undefined) return [];

  let tags = rawTags;

  if (typeof rawTags === "string") {
    try {
      tags = JSON.parse(rawTags);
    } catch {
      throw new Error("Tags must contain valid JSON.");
    }
  }

  if (!Array.isArray(tags)) {
    throw new Error("Tags must be provided as a list.");
  }

  if (!tags.every((tag) => typeof tag === "string")) {
    throw new Error("Every tag must be text.");
  }

  const cleanedTags = tags.map((tag) => tag.trim()).filter(Boolean);

  if (cleanedTags.some((tag) => tag.length > MAX_TAG_LENGTH)) {
    throw new Error(
      `Each tag must be ${MAX_TAG_LENGTH} characters or fewer.`,
    );
  }

  const uniqueTags = [
    ...new Map(
      cleanedTags.map((tag) => [tag.toLowerCase(), tag]),
    ).values(),
  ];

  if (uniqueTags.length > MAX_TAGS) {
    throw new Error(`You can add up to ${MAX_TAGS} tags.`);
  }

  return uniqueTags;
};

const validateImage = (file) => {
  if (!file) {
    return "A featured image is required.";
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    return "Only JPG, PNG, and WebP images are allowed.";
  }

  if (!file.size || file.size > MAX_IMAGE_SIZE) {
    return "The image must be larger than 0 bytes and no bigger than 5 MB.";
  }

  return null;
};


export const createPost = async (req, res) => {
  try {
    const title =
      typeof req.body.title === "string" ? req.body.title.trim() : "";
    const content =
      typeof req.body.content === "string"
        ? req.body.content.trim()
        : "";
    const category =
      typeof req.body.category === "string"
        ? req.body.category.trim()
        : "";

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    if (title.length > MAX_TITLE_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Title cannot exceed ${MAX_TITLE_LENGTH} characters.`,
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required.",
      });
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`,
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required.",
      });
    }

    if (category.length > MAX_CATEGORY_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Category cannot exceed ${MAX_CATEGORY_LENGTH} characters.`,
      });
    }

    const imageError = validateImage(req.file);

    if (imageError) {
      return res.status(400).json({
        success: false,
        message: imageError,
      });
    }

    let tags;

    try {
      tags = parseTags(req.body.tags);
    } catch (tagError) {
      return res.status(400).json({
        success: false,
        message: tagError.message,
      });
    }

    const post = await Post.create({
      title,
      content,
      image: `/uploads/${req.file.filename}`,
      category,
      tags,
      author: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create post error:", error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the post.",
    });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("author", "name profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name profileImage",
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE POST

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own posts.",
      });
    }

    const hasField = (field) =>
      Object.prototype.hasOwnProperty.call(req.body, field);

    if (hasField("title")) {
      if (typeof req.body.title !== "string") {
        return res.status(400).json({
          success: false,
          message: "Title must be text.",
        });
      }

      const title = req.body.title.trim();

      if (!title) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty.",
        });
      }

      if (title.length > MAX_TITLE_LENGTH) {
        return res.status(400).json({
          success: false,
          message: `Title cannot exceed ${MAX_TITLE_LENGTH} characters.`,
        });
      }

      post.title = title;
    }

    if (hasField("content")) {
      if (typeof req.body.content !== "string") {
        return res.status(400).json({
          success: false,
          message: "Content must be text.",
        });
      }

      const content = req.body.content.trim();

      if (!content) {
        return res.status(400).json({
          success: false,
          message: "Content cannot be empty.",
        });
      }

      if (content.length > MAX_CONTENT_LENGTH) {
        return res.status(400).json({
          success: false,
          message: `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`,
        });
      }

      post.content = content;
    }

    if (hasField("category")) {
      if (typeof req.body.category !== "string") {
        return res.status(400).json({
          success: false,
          message: "Category must be text.",
        });
      }

      const category = req.body.category.trim();

      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Category cannot be empty.",
        });
      }

      if (category.length > MAX_CATEGORY_LENGTH) {
        return res.status(400).json({
          success: false,
          message: `Category cannot exceed ${MAX_CATEGORY_LENGTH} characters.`,
        });
      }

      post.category = category;
    }

    if (hasField("tags")) {
      try {
        post.tags = parseTags(req.body.tags);
      } catch (tagError) {
        return res.status(400).json({
          success: false,
          message: tagError.message,
        });
      }
    }

    if (req.file) {
      const imageError = validateImage(req.file);

      if (imageError) {
        return res.status(400).json({
          success: false,
          message: imageError,
        });
      }

      post.image = `/uploads/${req.file.filename}`;
    }

    // Existing image may be kept, but the post must have one.
    if (!post.image || !post.image.trim()) {
      return res.status(400).json({
        success: false,
        message: "A featured image is required.",
      });
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID.",
      });
    }

    console.error("Update post error:", error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating the post.",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own posts",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likesCount: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLikedPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      likes: req.user._id,
    })
      .populate("author", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required",
      });
    }

    const posts = await Post.find({
      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          content: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    })
      .populate("author", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    const posts = await Post.find({
      category: {
        $regex: `^${req.params.category}$`,
        $options: "i",
      },
    })
      .populate("author", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
