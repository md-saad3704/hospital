import React, { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; // ✅ Prop validation
// import './DepartmentSelection.css';

function DepartmentSelection({ departments = [], onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Safe filtering (no more undefined error)
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="department-container">
      <h2 className="text-2xl font-bold mb-2">Departments in Apollo Hospital</h2>
      <p className="subheading mb-4 text-gray-600">
        Choose a department to explore services
      </p>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search departments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar border px-3 py-2 rounded w-full mb-6"
      />

      {/* 🚫 No Results */}
      {filteredDepartments.length === 0 ? (
        <p className="no-results text-red-500 font-medium">
          🚫 No departments found for "{searchTerm}"
        </p>
      ) : (
        <div className="department-grid grid md:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => (
            <motion.div
              key={dept.id}
              className="department-card p-4 bg-white rounded-xl shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="department-icon text-4xl mb-2">{dept.icon}</div>
              <h3 className="text-lg font-semibold">{dept.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{dept.description}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(dept.id)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600"
              >
                {dept.action}
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ✅ PropTypes validation
DepartmentSelection.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.node, // React element (emoji/icon/component)
      action: PropTypes.string, // e.g., "View Doctors"
    })
  ),
  onSelect: PropTypes.func.isRequired,
};

export default DepartmentSelection;
