import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Stethoscope } from "lucide-react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Profile", path: "/profile" },
    { name: "Find Doctor", path: "/doctorlist" },
    { name: "Hospital Department", path: "/hospitaldepartment" },
    { name: "Department", path: "/department" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-2 text-2xl font-bold text-indigo-600"
        >
          <Stethoscope className="h-6 w-6 text-indigo-600" />
          <span>HealthCare+</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "text-indigo-600 bg-indigo-100"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-indigo-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Links */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)} // close after click
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition ${
                  isActive
                    ? "text-indigo-600 bg-indigo-100"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
