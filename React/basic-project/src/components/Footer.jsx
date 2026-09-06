function Footer() {
  return (
    <footer className="mt-16 bg-purple-50 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {}
          <div>
            <h2 className="text-2xl font-bold text-purple-700">🎓 LearnHub</h2>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              LearnHub is your all-in-one platform to learn, build and grow your
              skills with expert-crafted courses.
            </p>

            <div className="flex gap-4 mt-5 text-gray-600">
              <span>f</span>
              <span>𝕏</span>
              <span>◎</span>
              <span>in</span>
              <span>▶</span>
            </div>
          </div>

          {}
          <div>
            <h3 className="font-bold text-gray-900">Quick Links</h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>Home</li>
              <li>Courses</li>
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="font-bold text-gray-900">Resources</h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>All Courses</li>
              <li>Certificates</li>
              <li>Help Center</li>
              <li>Community</li>
              <li>Pricing</li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="font-bold text-gray-900">Company</h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        {}
        <div className="border-t border-purple-200 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © 2026 LearnHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
