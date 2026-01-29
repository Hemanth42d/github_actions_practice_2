import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Fill in both fields, please");
      return;
    }

    if (password.length < 6) {
      setError("Password's too short (6+ chars needed)");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Login:", { email, password });
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Something's not working. Try again?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
        <div className="flex p-1 bg-gray-100 rounded-t-lg">
          <Link
            to="/login"
            className={`flex-1 py-2 text-center text-sm rounded-md transition-all ${
              isLoginPage
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Log in
          </Link>
          <Link
            to="/"
            className={`flex-1 py-2 text-center text-sm rounded-md transition-all ${
              !isLoginPage
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Sign up
          </Link>
        </div>

        <div className="p-5">
          <div className="mb-5 text-center">
            <h3 className="text-lg font-medium text-gray-900">Hey there!</h3>
            <p className="text-gray-600 text-sm mt-1">
              Ready to get stuff done?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="password"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />

              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 text-xs"
                onClick={togglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && (
              <div className="text-red-700 text-xs bg-red-100 px-3 py-2 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 px-4 rounded-md text-sm font-medium"
            >
              {isLoading ? "Logging you in..." : "Log in"}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-gray-600">
            New around here?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Make an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
