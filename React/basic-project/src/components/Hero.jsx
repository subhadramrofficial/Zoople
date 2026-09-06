function Hero() {
  return (
    <section className="bg-purple-50 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left side */}
      <div className="max-w-xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Learn. Build. Grow.
        </h1>

        <p className="text-lg text-gray-600 mt-5 leading-relaxed">
          Explore high-quality courses and build real-world skills that help you
          achieve your goals.
        </p>

        <button className="mt-7 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700">
          Explore Courses →
        </button>
      </div>

      {/* Right side */}
      <div className="w-full max-w-80 h-56 md:h-64 bg-purple-200 rounded-xl flex items-center justify-center">
        <span className="text-7xl">👩🏻‍💻</span>
      </div>
    </section>
  );
}

export default Hero;
