import CourseCard from "./CourseCard";

function CourseSection() {
  return (
    <section className="mt-10">

      {/* Heading */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">
          Featured Courses
        </h2>

        <button className="text-purple-600 font-medium">
          View all courses →
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <CourseCard
          title="React Development"
          description="Learn React from scratch and build real-world applications."
          rating="4.8"
          lessons="24"
        />

        <CourseCard
          title="JavaScript Mastery"
          description="Master modern JavaScript from basics to advanced."
          rating="4.9"
          lessons="32"
        />

        <CourseCard
          title="Tailwind CSS"
          description="Build beautiful, responsive layouts with Tailwind CSS."
          rating="4.7"
          lessons="18"
        />

        <CourseCard
          title="Node.js & Express"
          description="Build powerful backend APIs with Node.js & Express."
          rating="4.8"
          lessons="20"
        />

      </div>

    </section>
  );
}

export default CourseSection;