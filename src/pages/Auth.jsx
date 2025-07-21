import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!isLogin && formData.name.trim() === "")
      newErrors.name = "Please enter your full name";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModeSwitch = (login) => {
    setIsLogin(login);
    setFormData({ name: "", email: "", password: "" });
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
      setFormData((prev) => ({ ...prev, password: "" }));
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
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-100 transition-all duration-300">
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
            className="space-y-5"
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
                  placeholder="John Doe"
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
                placeholder="you@example.com"
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
                    // Eye-off icon (use heroicons or your own SVG)
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.656.41-3.219 1.125-4.575M15 12a3 3 0 01-3 3m6.364-9.364A10.072 10.072 0 0112 3c-2.36 0-4.532.814-6.364 2.364"
                      />
                    </svg>
                  ) : (
                    // Eye icon
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <span id="password-error" className="text-xs text-red-500 pl-1">
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
                <svg className="h-5 w-5" viewBox="0 0 533.5 544.3">
                  <g>
                    <path fill="#4285f4" d="M533.5 278.4..." />
                    {/* use a public SVG icon or an icon library here */}
                  </g>
                </svg>
                <span>Continue with Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                onClick={() => handleSocial("GitHub")}
                aria-label="Sign in with GitHub"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 0.3C5.4..." />
                </svg>
                <span>Continue with Microsoft</span>
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
