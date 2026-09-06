function CourseCard({ title, description, rating, lessons }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      {}
      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-5xl">⚛️</span>
      </div>

      {}
      <h3 className="text-lg font-bold mt-4">{title}</h3>

      <p className="text-sm text-gray-600 mt-2">{description}</p>

      {}
      <div className="flex justify-between mt-4 text-sm">
        <span>⭐ {rating}</span>
        <span>{lessons} Lessons</span>
      </div>

      {}
      <button className="w-full mt-5 border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-600 hover:text-white">
        View Course →
      </button>
    </div>
  );
}

export default CourseCard;
