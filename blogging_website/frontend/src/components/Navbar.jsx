import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          BLOGSPACE
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-black">
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/profile"
                className="text-gray-600 hover:text-black"
              >
                Profile
              </Link>

              <Link
                to="/create-post"
                className="text-gray-600 hover:text-black"
              >
                Create Blog
              </Link>

              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-black">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;