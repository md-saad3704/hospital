import React, { useState } from "react";
import { Link } from "react-router-dom";

const dummyUser = {
  name: "Nuba",
  email: "nuba@example.com",
  phone: "+91 9876543210",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
};

const appointments = [
  {
    id: 1,
    doctor: "Dr. Arjun Rao",
    department: "Cardiology",
    hospital: "City Hospital",
    date: "2025-08-02",
    time: "11:30 AM",
    status: "upcoming",
  },
  {
    id: 2,
    doctor: "Dr. Meera Jain",
    department: "Neurology",
    hospital: "City Hospital",
    date: "2025-07-10",
    time: "02:00 PM",
    status: "past",
  },
];

export default function UserProfile() {
  const [user, setUser] = useState(dummyUser);
  const [form, setForm] = useState(dummyUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState("upcoming");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(form);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8D2FC] via-[#FDE2E0] to-[#E0E9F4] font-sans text-gray-800 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <img
              src={user.image}
              alt={user.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
            />
            <div>
              <h2 className="text-2xl font-bold text-blue-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
            <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200">
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-4">
          <button
            className={`pb-2 border-b-2 ${
              tab === "upcoming"
                ? "border-blue-600 text-blue-700 font-semibold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setTab("upcoming")}
          >
            Upcoming Appointments
          </button>
          <button
            className={`pb-2 border-b-2 ${
              tab === "past"
                ? "border-blue-600 text-blue-700 font-semibold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setTab("past")}
          >
            Past Appointments
          </button>
        </div>

        {/* Appointments */}
        <div>
          {appointments.filter((a) => a.status === tab).length > 0 ? (
            <ul className="space-y-4">
              {appointments
                .filter((a) => a.status === tab)
                .map((booking) => (
                  <li
                    key={booking.id}
                    className="border border-blue-100 rounded-xl p-4 bg-blue-50"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-700">
                          {booking.doctor}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {booking.department} – {booking.hospital}
                        </p>
                      </div>
                      <div className="text-sm text-gray-700 mt-2 md:mt-0">
                        {booking.date} at {booking.time}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No {tab} appointments.</p>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Edit Profile
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-4 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
