import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
  getUserPosts,
} from "../services/userService";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const API_ORIGIN = API_BASE_URL
  ? API_BASE_URL.replace(/\/api\/?$/, "")
  : "http://localhost:8000";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editData, setEditData] = useState({
    name: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        const data = await getUserProfile(storedUser.id);

        console.log("Profile:", data);

        setUser(data.user);
        const postData = await getUserPosts(storedUser.id);

        console.log("My Posts:", postData);

        setPosts(postData.posts || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="p-6">Loading profile...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const data = await updateUserProfile(editData);

      setUser(data.user);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Page Heading */}
        <div className="mb-10">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Account
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">My Profile</h1>

          <p className="text-gray-500 mt-3">
            Manage your profile and view your posts.
          </p>
        </div>

        {/* Profile Card */}
        {user && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  Profile
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-2">
                  {user.name}
                </h2>

                <p className="text-gray-500 mt-1">{user.email}</p>
              </div>

              <button
                onClick={() => {
                  setEditData({
                    name: user.name,
                    bio: user.bio || "",
                  });

                  setIsEditing(true);
                }}
                className="border border-gray-300 px-5 py-2.5 rounded-lg
                         text-sm font-medium
                         hover:bg-gray-100 transition"
              >
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-2">Bio</p>

              <p className="text-gray-700 leading-7">
                {user.bio || "No bio added yet."}
              </p>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-5">
                  Edit Profile
                </h3>

                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>

                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          name: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3
                               outline-none focus:ring-2 focus:ring-black"
                      placeholder="Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>

                    <textarea
                      value={editData.bio}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          bio: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3
                               outline-none focus:ring-2 focus:ring-black
                               resize-none"
                      placeholder="Tell us about yourself..."
                      rows="4"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-black text-white px-5 py-2.5 rounded-lg
                               hover:bg-gray-800 transition"
                    >
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="border border-gray-300 px-5 py-2.5 rounded-lg
                               hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* My Posts */}
        <div className="mt-12">
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Your Content
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-1">My Posts</h2>
          </div>

          {posts.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <p className="text-gray-500">
                You haven't created any posts yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  to={`/post/${post._id}`}
                  key={post._id}
                  className="group block bg-white border border-gray-200
                           rounded-2xl overflow-hidden
                           hover:shadow-lg transition duration-300"
                >
                  {/* Image */}
                  {post.image ? (
                    <img
                      src={
                        post.image.startsWith("http")
                          ? post.image.replace(
                              /^http:\/\/localhost:8000/,
                              API_ORIGIN,
                            )
                          : `${API_ORIGIN}${post.image.startsWith("/") ? "" : "/"}${post.image}`
                      }
                      alt={post.title}
                      className="w-full h-48 object-cover
                               group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}

                  <div className="p-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      {post.category}
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-6 mt-3 line-clamp-3">
                      {post.content}
                    </p>

                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">View post →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
