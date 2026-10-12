import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();

        console.log("Posts:", data);

        setPosts(data.posts || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Explore
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Latest Posts
          </h1>

          <p className="text-gray-500 mt-3 max-w-xl">
            Discover ideas, stories and thoughts from our community.
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
            <p className="text-gray-500">
              No posts available.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default Home;