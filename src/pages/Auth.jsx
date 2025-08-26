import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const transitionVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "", // Added date of birth
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle form state changes and validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    let error = "";
    if (name === "email" && !validateEmail(value)) error = "Invalid email";
    if (name === "password" && value.length < 6)
      error = "Password must be at least 6 characters";
    if (name === "name" && !isLogin && value.trim() === "")
      error = "Please enter your full name";
    // Date of birth validation
    if (name === "dob" && !isLogin && value.trim() === "")
      error = "Please enter your date of birth";

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!isLogin && formData.name.trim() === "")
      newErrors.name = "Please enter your full name";
    // Date of birth validation for registration
    if (!isLogin && formData.dob.trim() === "")
      newErrors.dob = "Please enter your date of birth";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModeSwitch = (login) => {
    setIsLogin(login);
    setFormData({ name: "", email: "", password: "", dob: "" }); // Reset dob
    setErrors({});
    setTouched({});
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`${isLogin ? "Logged in" : "Registered"} successfully!`);
      setFormData((prev) => ({ ...prev, password: "" })); // Keep other fields for demo purposes, clear password
    }, 1500);
  };

  // Simple SVG Spinner
  const Loader = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  );

  // Social sign-in stub handlers
  const handleSocial = (provider) => {
    alert(`Social sign in with ${provider} not implemented in this demo.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#D8D2FC] via-[#FDE2E0] to-[#E0E9F4] px-4">
      <div className="bg-white/30 rounded-2xl shadow-lg p-6 w-full max-w-md border border-gray-100 transition-all duration-300">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-6">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>

        {/* Main Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "login-form" : "register-form"}
            variants={transitionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
            aria-label={isLogin ? "Login Form" : "Registration Form"}
          >
            {/* Name (only for register) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                  className={`w-full px-4 py-3 border ${
                    errors.name && touched.name
                      ? "border-red-400"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name && touched.name
                      ? "focus:ring-red-400"
                      : "focus:ring-indigo-400"
                  } transition`}
                />
                {errors.name && touched.name && (
                  <span id="name-error" className="text-xs text-red-500 pl-1">
                    {errors.name}
                  </span>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                autoComplete="username"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                className={`w-full px-4 py-3 border ${
                  errors.email && touched.email
                    ? "border-red-400"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email && touched.email
                    ? "focus:ring-red-400"
                    : "focus:ring-indigo-400"
                } transition`}
              />
              {errors.email && touched.email && (
                <span id="email-error" className="text-xs text-red-500 pl-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Date of Birth (only for register) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="dob"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.dob}
                  aria-describedby="dob-error"
                  className={`w-full px-4 py-3 border ${
                    errors.dob && touched.dob
                      ? "border-red-400"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.dob && touched.dob
                      ? "focus:ring-red-400"
                      : "focus:ring-indigo-400"
                  } transition`}
                />
                {errors.dob && touched.dob && (
                  <span id="dob-error" className="text-xs text-red-500 pl-1">
                    {errors.dob}
                  </span>
                )}
              </div>
            )}

            {/* Password with Show/Hide */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="********"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                  className={`w-full px-4 py-3 border ${
                    errors.password && touched.password
                      ? "border-red-400"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password && touched.password
                      ? "focus:ring-red-400"
                      : "focus:ring-indigo-400"
                  } transition pr-12`}
                />
                <button
                  type="button"
                  tabIndex={0}
                  className="absolute right-2 top-2/4 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <span
                  id="password-error"
                  className="text-xs text-red-500 pl-1"
                >
                  {errors.password}
                </span>
              )}
              {isLogin && (
                <div className="mt-2 text-right text-sm">
                  <button
                    type="button"
                    className="text-indigo-600 hover:underline font-medium"
                    onClick={() => alert("Redirect to forgot password page")}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>

            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-3 text-gray-400 text-xs uppercase">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Social Sign In Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                onClick={() => handleSocial("Google")}
                aria-label="Sign in with Google"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h147.2c-6.3 33.9-25.1 62.6-53.5 81.8v67.7h86.5c50.6-46.6 81.3-115.3 81.3-194.4z"
                    fill="#4285F4"
                  />
                  <path
                    d="M272 544.3c72.9 0 134.1-24.2 178.8-65.8l-86.5-67.7c-24.1 16.2-54.8 25.6-92.3 25.6-70.9 0-131-47.9-152.5-112.1H29.7v70.3C74.8 486.2 167.7 544.3 272 544.3z"
                    fill="#34A853"
                  />
                  <path
                    d="M119.5 324.3c-10.4-30.3-10.4-62.8 0-93.1V160.9H29.7c-32.4 63.7-32.4 139.7 0 203.4l89.8-70z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M272 107.7c39.6-.6 77.7 14.1 106.4 41.2l79.4-79.4C416.1 24.2 354.9 0 272 0 167.7 0 74.8 58.1 29.7 160.9l89.8 70c21.5-64.2 81.6-112.1 152.5-112.1z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full py-2 border border-gray-200 rounded-lg hover:bg-gray-50  transition"
                onClick={() => handleSocial("Phone")}
                aria-label="Sign in with Phone Number"
              >
                <svg
                  className="h-5 w-5 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.6a1 1 0 01.94.658l1.518 4.555a1 1 0 01-.217 1.015l-2.017 2.017a11.042 11.042 0 005.292 5.292l2.017-2.017a1 1 0 011.015-.217l4.555 1.518A1 1 0 0121 17.4V21a2 2 0 01-2 2h-.2C9.39 23 1 14.61 1 4.2V4a1 1 0 011-1h1z"
                  />
                </svg>
                <span>Continue with Phone Number</span>
              </button>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: !loading ? 1.03 : 1 }}
              whileTap={{ scale: !loading ? 0.98 : 1 }}
              disabled={loading}
              aria-disabled={loading}
              className={`w-full bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader />
                  <span>{isLogin ? "Logging in..." : "Registering..."}</span>
                </>
              ) : (
                <span>{isLogin ? "Login" : "Register"}</span>
              )}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {/* Toggle Auth Mode */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch(false)}
                className="text-indigo-600 hover:underline font-medium"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch(true)}
                className="text-indigo-600 hover:underline font-medium"
              >
                Login here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}