import FeatureCard from "./FeatureCard";

function FeatureSection() {
  return (
    <section className="mt-16">
      {}
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Why Learn with LearnHub?
      </h2>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        <FeatureCard
          icon="🚀"
          title="Practical Learning"
          description="Learn through hands-on projects and real-world examples."
        />

        <FeatureCard
          icon="💻"
          title="Build Projects"
          description="Build projects that boost your portfolio and confidence."
        />

        <FeatureCard
          icon="🎯"
          title="Track Progress"
          description="Track your progress and achievements in one place."
        />
      </div>
    </section>
  );
}

export default FeatureSection;
