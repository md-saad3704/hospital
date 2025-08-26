import { motion } from "framer-motion";
// import landingImage from "../images/landing.png";
import Navbar from "../components/Navbar"; // ✅ fixed path

export default function Home() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-[#D8D2FC] via-[#FDE2E0] to-[#E0E9F4] font-sans text-gray-800">
      <h1 className = "text-3xl">This is the home page</h1>
    </div>
    </>
  );
}