function Sidebar() {
  return (
    <aside className="hidden md:block w-52 min-h-screen border-r border-gray-200 bg-white p-5">
      {/* Menu */}
      <div className="space-y-3">
        <div className="bg-purple-600 text-white rounded-lg px-4 py-3 flex items-center gap-3">
          <span>🏠</span>
          <span>Dashboard</span>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-purple-50 rounded-lg cursor-pointer">
          <span>📖</span>
          <span>Courses</span>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-purple-50 rounded-lg cursor-pointer">
          <span>♡</span>
          <span>Favorites</span>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-purple-50 rounded-lg cursor-pointer">
          <span>📈</span>
          <span>Progress</span>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-purple-50 rounded-lg cursor-pointer">
          <span>🏅</span>
          <span>Certificates</span>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-purple-50 rounded-lg cursor-pointer">
          <span>⚙️</span>
          <span>Settings</span>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-purple-50 rounded-lg cursor-pointer">
          <span>❔</span>
          <span>Help & Support</span>
        </div>
      </div>

      {/* Upgrade Card */}
      <div className="mt-8 bg-purple-50 rounded-xl p-4">
        <h3 className="font-bold text-purple-700">Upgrade to Pro 👑</h3>
        <p className="text-sm text-gray-600 mt-2">
          Unlock all courses, certificates and premium resources.
        </p>
        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
