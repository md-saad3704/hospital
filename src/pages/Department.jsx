import React, { useState } from "react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const departments = [
    { id: 1, icon: "❤️", title: "Cardiology", description: "Heart and vascular care" },
    { id: 2, icon: "🧠", title: "Neurology", description: "Brain and nervous system care" },
    { id: 3, icon: "🦴", title: "Orthopedics", description: "Bones and muscle care" },
    { id: 4, icon: "👶", title: "Pediatrics", description: "Child healthcare" },
    { id: 5, icon: "🧴", title: "Dermatology", description: "Skin and cosmetic care" },
    { id: 6, icon: "📱", title: "Radiology", description: "Imaging and diagnostics" },
    { id: 7, icon: "🎗️", title: "Oncology", description: "Cancer diagnosis and treatment" },
    { id: 8, icon: "🏥", title: "Gastroenterology", description: "Digestive system care" },
  ];

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8D2FC] via-[#FDE2E0] to-[#E0E9F4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2 sm:mb-4">
            Departments in Apollo Hospital
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
            Choose a department to explore services
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="relative w-full max-w-sm sm:max-w-md">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                  {dept.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-3">
                  {dept.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 px-2">
                  {dept.description}
                </p>

                {/* Explore Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto">
                  Explore
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No departments found matching "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-blue-600 hover:text-blue-700 underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;