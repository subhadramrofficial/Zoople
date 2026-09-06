function Header() {
  return (
    <header className="h-20 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-6">
      {}
      <div className="flex items-center gap-2">
        <div className="text-3xl">🎓</div>
        <h1 className="text-2xl font-bold text-purple-700">LearnHub</h1>
      </div>

      {}
      <nav className="hidden md:flex items-center gap-8">
        <a
          href="#"
          className="text-purple-600 font-medium border-b-2 border-purple-600 pb-6"
        >
          Home
        </a>

        <a href="#" className="text-gray-700 hover:text-purple-600">
          Courses
        </a>

        <a href="#" className="text-gray-700 hover:text-purple-600">
          About
        </a>

        <a href="#" className="text-gray-700 hover:text-purple-600">
          Blog
        </a>

        <a href="#" className="text-gray-700 hover:text-purple-600">
          Contact
        </a>
      </nav>

      {}
      <div className="flex items-center gap-6">
        {}
        <div className="hidden lg:flex items-center border border-gray-300 rounded-xl px-4 py-2">
          <input
            type="text"
            placeholder="Search courses..."
            className="outline-none w-40"
          />
          <span>🔍</span>
        </div>

        {}
        <div className="relative text-xl">
          🔔
          <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>

        {}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
            👩🏻
          </div>

          <span className="hidden sm:inline font-medium">Hasna</span>

          <span>⌄</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
