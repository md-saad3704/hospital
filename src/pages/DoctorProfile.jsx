import React from "react";
import { useParams, Link } from "react-router-dom";

const dummyDoctors = {
  101: {
    name: "Dr. Arjun Rao",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    department: "Cardiology",
    hospital: "City Hospital",
    experience: "10+ years",
    bio: "Dr. Arjun is an experienced cardiologist known for accurate diagnosis and compassionate care.",
  },
  102: {
    name: "Dr. Meera Jain",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    department: "Neurology",
    hospital: "City Hospital",
    experience: "8 years",
    bio: "Specialist in neurological disorders including epilepsy and migraines.",
  },
  103: {
    name: "Dr. Rajesh Patel",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    department: "Orthopedics",
    hospital: "Green Valley Hospital",
    experience: "12 years",
    bio: "Focused on sports injuries, fractures, and joint replacements.",
  },
  104: {
    name: "Dr. Rina Kaur",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    department: "Dermatology",
    hospital: "Green Valley Hospital",
    experience: "6 years",
    bio: "Expert in acne, pigmentation, and cosmetic dermatology.",
  },
};

export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = dummyDoctors[id];

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Doctor not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8D2FC] via-[#FDE2E0] to-[#E0E9F4] px-6 py-12">
      <div className="max-w-3xl mx-auto bg-blue-50 shadow-lg rounded-xl p-8">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-center text-blue-800">
          {doctor.name}
        </h1>
        <p className="text-center text-gray-600">{doctor.department}</p>
        <p className="text-center text-gray-500">{doctor.hospital}</p>
        <p className="text-center text-gray-500 italic mt-2">
          Experience: {doctor.experience}
        </p>

        <p className="mt-6 text-gray-700 text-justify">{doctor.bio}</p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/doctorlist"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            ← Back to Doctors
          </Link>
        </div>
      </div>
    </div>
  );
}
