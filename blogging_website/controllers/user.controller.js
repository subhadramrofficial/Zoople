import User from "../models/user.model.js";
import Post from "../models/post.model.js";


// GET USER PROFILE
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const postCount = await Post.countDocuments({
            author: user._id
        });

        res.status(200).json({
            success: true,
            user,
            postCount
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const { name, bio, profileImage } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (name) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (profileImage !== undefined) {
            user.profileImage = profileImage;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET USER POSTS
export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({
            author: req.params.id
        })
            .populate("author", "name profileImage")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            posts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};