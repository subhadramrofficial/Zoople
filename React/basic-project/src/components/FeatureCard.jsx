function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-5">

      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-3xl">
        {icon}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  );
}

export default FeatureCard;