import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";
import { useState } from "react";
import axios from "axios";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../context/context";

type loginForm = {
  email: string,
  password: string
}
const Login: React.FC = () => {

  const navigate = useNavigate();
  const ctx = useContext(authcontext);
  const [formData, setFormData] = useState<loginForm>({ email: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  if(!ctx)return null;
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.backendEndpoint}/api/v1/auth/login`, formData, { withCredentials: true, });
      if (response.data.success) {
        navigate('/');
        ctx.setAuth({
          isAuthenticated: true,
          user: response.data.user,
          loading: false
        })

      }
    }
    catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const msg = e?.response?.data.msg;
        alert(msg || "Unknow Error");
      }
    }
  }
  return (
    <div className={`${theme.colors.background} min-h-screen flex items-center justify-center`}>
      <div className={`${theme.colors.cardBg} w-full max-w-md rounded-xl shadow-md p-8`}>

        <h2 className={`text-2xl font-bold text-center ${theme.colors.text}`}>
          Welcome Back
        </h2>
        <p className={`text-center mt-2 mb-6 ${theme.colors.subText}`}>
          Login to continue to SkillPilot
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block mb-1 text-sm ${theme.colors.subText}`}>
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={`block mb-1 text-sm ${theme.colors.subText}`}>
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={`w-full ${theme.colors.primary} ${theme.colors.primaryText} py-2 rounded-lg font-medium ${theme.colors.buttonHover}`}
          >
            Login
          </button>
        </form>

        <p className={`text-sm text-center mt-6 ${theme.colors.subText}`}>
          Not registered?{" "}
          <Link to="/register" className={`${theme.colors.accent} font-medium`}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
