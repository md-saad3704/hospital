import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const hospitals = [
  { id: 1, name: "City Hospital" },
  { id: 2, name: "Green Valley Hospital" },
];

const departments = {
  1: ["Cardiology", "Neurology", "Pediatrics"],
  2: ["Orthopedics", "Dermatology"],
};

const doctors = [
  {
    id: 101,
    name: "Dr. Arjun Rao",
    hospitalId: 1,
    department: "Cardiology",
    // image: "https://randomuser.me/api/portraits/men/11.jpg",
    bio: "Experienced cardiologist with 10+ years of experience.",
  },
  {
    id: 102,
    name: "Dr. Meera Jain",
    hospitalId: 1,
    department: "Neurology",
    // image: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Neurologist specializing in migraine and nerve disorders.",
  },
  {
    id: 103,
    name: "Dr. Rajesh Patel",
    hospitalId: 2,
    department: "Orthopedics",
    // image: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Bone and joint specialist. Former AIIMS surgeon.",
  },
  {
    id: 104,
    name: "Dr. Rina Kaur",
    hospitalId: 2,
    department: "Dermatology",
    // image: "https://randomuser.me/api/portraits/women/45.jpg",
    bio: "Skin and hair specialist. Known for laser treatments.",
  },
];

export default function DoctorList() {
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.hospitalId.toString() === selectedHospital &&
      doc.department === selectedDept &&
      doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className=" min-h-screen bg-gradient-to-br from-[#D8D2FC] via-[#FDE2E0] to-[#E0E9F4] py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white/60 backdrop-blur-md  shadow-xl rounded-3xl p-8">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
            Find a Doctor
          </h1>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Select Hospital
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => {
                  setSelectedHospital(e.target.value);
                  setSelectedDept("");
                }}
                value={selectedHospital}
              >
                <option value="">Choose a Hospital</option>
                {hospitals.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedHospital && (
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Select Department
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={(e) => setSelectedDept(e.target.value)}
                  value={selectedDept}
                >
                  <option value="">Choose a Department</option>
                  {departments[selectedHospital]?.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {selectedDept && (
            <input
              type="text"
              placeholder="Search doctor by name..."
              className="w-full p-3 border border-gray-300 rounded-lg mb-6"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredDoctors.length > 0
              ? filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow hover:shadow-md transition"
                  >
                    {/* <img
                    // src={doc.image}
                    alt={doc.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
                  /> */}
                    <h3 className="text-lg font-semibold text-center text-blue-800">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-center text-gray-600">
                      {doc.department}
                    </p>
                    <p className="text-xs text-center text-gray-500 mt-1">
                      {hospitals.find((h) => h.id === doc.hospitalId)?.name}
                    </p>

                    <Link
                      to={`/doctor/${doc.id}`}
                      className="block mt-4 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      View Profile
                    </Link>
                  </div>
                ))
              : selectedDept && (
                  <p className="col-span-full text-center text-red-500 font-medium">
                    No doctors found for this selection.
                  </p>
                )}
          </div>
        </div>
      </div>
    </>
  );
}
