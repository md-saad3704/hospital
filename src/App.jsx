// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import DoctorList from "./pages/DoctorList";
import DoctorProfile from "./pages/DoctorProfile";
import UserProfile from "./Profile.jsx";

import "./index.css";
// import EditProfilePage from "./EditProfile";


export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </AnimatePresence>
  );
}
