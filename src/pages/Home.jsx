// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import landingImage from "../images/landing.png";

export default function Home() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  // Function to smooth scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to smooth scroll to a specific section by its ID
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start", // Scrolls to the top of the element
      });
      setMenuOpen(false); // Close mobile menu after clicking a link
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8D2FC] via-[#FDE2E0] to-[#E0E9F4] font-sans text-gray-800">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-sm bg-white/80 backdrop-blur-md">
        {/* Animated MediCare+ link with smooth scroll to top */}
        <motion.a
          href="/"
          className="text-2xl font-bold text-blue-600 relative group overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          MediCare+
          {/* Animated underline for MediCare+ */}
          <span className="absolute left-0 bottom-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {/* Features Link */}
          <a
            href="#features"
            className="relative group hover:text-blue-500"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
            }}
          >
            Features
            <span className="absolute left-0 bottom-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </a>
          {/* How It Works Link */}
          <a
            href="#how-it-works"
            className="relative group hover:text-blue-500"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("how-it-works");
            }}
          >
            How It Works
            <span className="absolute left-0 bottom-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </a>
          {/* Benefits Link */}
          <a
            href="#benefits"
            className="relative group hover:text-blue-500"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("benefits");
            }}
          >
            Benefits
            <span className="absolute left-0 bottom-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </a>
          <a href="/doctors" className="hover:text-blue-500">
            Find a Doctor
          </a>
          <a href="/profile" className="hover:text-blue-500"></a>
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md shadow-md flex flex-col space-y-4 p-4 z-10 md:hidden">
            {/* Mobile Features Link */}
            <a
              href="#features"
              className="hover:text-blue-500"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("features");
              }}
            >
              Features
            </a>
            {/* Mobile How It Works Link */}
            <a
              href="#how-it-works"
              className="hover:text-blue-500"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("how-it-works");
              }}
            >
              How It Works
            </a>
            {/* Mobile Benefits Link */}
            <a
              href="#benefits"
              className="hover:text-blue-500"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("benefits");
              }}
            >
              Benefits
            </a>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/Auth");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition w-full"
            >
              Login
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-row flex-wrap items-center px-4 md:px-8 py-12 md:py-20 max-w-6xl mx-auto gap-8 justify-center">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-blue-800">
            Smarter Hospital Management Starts Here
          </h2>
          <p className="text-lg text-gray-600">
            Streamline operations, manage appointments, and access health
            records — all from a unified platform.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src={landingImage}
            alt="Hospital dashboard"
          />
        </div>
      </section>

      {/* Key Features Section - ensure it has the id="features" */}
      <section id="features" className="px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-blue-800">
          Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {[
            {
              title: "Appointment Scheduling",
              desc: "Patients can book, cancel, or reschedule with ease through an intuitive interface.",
            },
            {
              title: "Medical Records",
              desc: "Secure access to test results, reports, and doctor notes in one central location.",
            },
            {
              title: "Billing & Payments",
              desc: "Generate invoices and track billing digitally with transparency.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300"
            >
              <h4 className="text-xl font-semibold mb-2 text-blue-700">
                {feature.title}
              </h4>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section - ensure it has the id="how-it-works" */}
      <section id="how-it-works" className="px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-blue-800">
          How It Works
        </h3>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              1. Register
            </h4>
            <p className="text-gray-700">
              Patients and doctors register securely on the platform.
            </p>
          </div>
          <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              2. Connect
            </h4>
            <p className="text-gray-700">
              Book appointments, access records, and communicate instantly.
            </p>
          </div>
          <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              3. Manage
            </h4>
            <p className="text-gray-700">
              Track treatment, payments, and health progress over time.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section - ensure it has the id="benefits" */}
      <section id="benefits" className="px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-blue-800">
          Why Choose MediCare+
        </h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              Efficiency
            </h4>
            <p className="text-gray-700">
              Automates routine tasks so staff can focus on patient care.
            </p>
          </div>
          <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              Security
            </h4>
            <p className="text-gray-700">
              HIPAA-compliant data management and end-to-end encryption.
            </p>
          </div>
          <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              Scalability
            </h4>
            <p className="text-gray-700">
              Suitable for clinics, hospitals, and health networks of all sizes.
            </p>
          </div>
          <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              User Experience
            </h4>
            <p className="text-gray-700">
              Minimalistic, intuitive design for both staff and patients.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-600 bg-white/80 backdrop-blur-md">
        © 2025 MediCare+. All rights reserved.
      </footer>
    </div>
  );
}