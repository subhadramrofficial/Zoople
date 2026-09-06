import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import CourseSection from "./components/CourseSection";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-7">
          <Hero />

          <CourseSection />

          <FeatureSection />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
