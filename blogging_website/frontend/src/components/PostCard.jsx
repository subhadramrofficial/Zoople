import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Link
      to={`/post/${post._id}`}
      className="group block"
    >
      <div className="h-[540px] bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">

        {/* Image */}
       {/* Image */}
{post.image ? (
  <div className="w-full aspect-[4/3] overflow-hidden">
    <img
      src={`http://localhost:8000${post.image}`}
      alt={post.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
) : (
  <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
    <span className="text-gray-400 text-sm">
      No image
    </span>
  </div>
)}
        {/* Content */}
        <div className="p-6 flex flex-col flex-1">

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {post.category}
          </p>

          <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
            {post.title}
          </h2>

          <p className="text-gray-500 text-sm leading-6 line-clamp-3">
            {post.content}
          </p>

          {/* Bottom */}
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">

            <p className="text-sm text-gray-500">
              {post.author?.name || "Unknown Author"}
            </p>

            <p className="text-sm text-gray-500">
              ❤️ {post.likes?.length || 0}
            </p>

          </div>

        </div>
      </div>
    </Link>
  );
};

export default PostCard;