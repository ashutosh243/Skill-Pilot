import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";
import { useState } from "react";
import config from "../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {

  const navigate = useNavigate();
  const [formData, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.backendEndpoint}/api/v1/auth/register`, formData);
      if (response.data.success) {
        navigate('/login')
      }

    }
    catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const msg = e?.response?.data.msg;
        alert(msg);
      }
      else {
        alert("unknow Error");
      }
    }
  }
  return (
    <div className={`${theme.colors.background} min-h-screen flex items-center justify-center`}>
      <div className={`${theme.colors.cardBg} w-full max-w-md rounded-xl shadow-md p-8`}>

        <h2 className={`text-2xl font-bold text-center ${theme.colors.text}`}>
          Create Account
        </h2>
        <p className={`text-center mt-2 mb-6 ${theme.colors.subText}`}>
          Start your journey with SkillPilot
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block mb-1 text-sm ${theme.colors.subText}`}>
              Name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Your name"
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={`block mb-1 text-sm ${theme.colors.subText}`}>
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="you@example.com"
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={`block mb-1 text-sm ${theme.colors.subText}`}>
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="••••••••"
              name='password'
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <button
            type="submit"
            className={`w-full ${theme.colors.primary} ${theme.colors.primaryText} py-2 rounded-lg font-medium ${theme.colors.buttonHover}`}
          >
            Sign Up
          </button>
        </form>

        <p className={`text-sm text-center mt-6 ${theme.colors.subText}`}>
          Already registered?{" "}
          <Link to="/login" className={`${theme.colors.accent} font-medium`}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
