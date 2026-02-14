import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";
import logo from '../assets/logo.png';
import { authcontext } from "../context/context";
import axios from "axios";
import config from "../config/config";
import type { authContextType } from '../context/context';

const Navbar: React.FC = () => {

    const ctx = useContext<authContextType | null>(authcontext);
    const [open, setOpen] = useState(false);
    const handleLogout = async () => {
        try {
            const response = await axios.post(`${config.backendEndpoint}/api/v1/auth/logout`, {}, { withCredentials: true });
            const data = response.data;
            ctx?.setAuth({ isAuthenticated: false, user: null, loading: false });
            alert(data.msg);
        }
        catch (e) {
            console.log(e);
        }
    }
    if (!ctx) return null;
    return (
        <nav className={`${theme.colors.cardBg} shadow-md ${theme.spacing.navHeight}  fixed w-full flex items-center  z-50`}>
            <div className="max-w-7xl mx-auto flex w-full items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-2 font-bold text-2xl text-teal-600 hover:opacity-90 transition"
                >
                    <img
                        src={logo}
                        alt="SkillPilot logo"
                        className="h-10 w-15 object-contain"
                    />
                    <span>SkillPilot</span>
                </Link>


                <div className="flex space-x-6">
                    <Link
                        to="/path-generate"
                        className={`${theme.colors.text} font-medium text-lg ${theme.colors.linkHover} transition`}
                    >
                        Career Path Planner
                    </Link>
                    <Link
                        to="/interview-question"
                        className={`${theme.colors.text} font-medium text-lg ${theme.colors.linkHover} transition`}
                    >
                        Interview Question Lab
                    </Link> 
                    <Link
                        to="/doc-prep"
                        className={`${theme.colors.text} font-medium text-lg ${theme.colors.linkHover} transition`}
                    >
                        Doc Prep
                    </Link>

                </div>


                {ctx.auth.isAuthenticated === false ? (<div className="flex space-x-4">
                    <Link to='/login'>
                        <button className={`cursor-pointer px-4 py-2 rounded-lg border ${theme.colors.accent} border-sky-500 ${theme.colors.text} font-medium hover:${theme.colors.accentBg} transition`}>
                            Login
                        </button>
                    </Link>
                    <Link to='/register'>
                        <button className={`cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-teal-700 to-teal-500 text-white  font-medium shadow-md hover:from-teal-900 hover:to-teal-900 transition`}>
                            Sign Up
                        </button>
                    </Link>
                </div>) : (

                    <div className="relative">

                        <div
                            onClick={() => setOpen(!open)}
                            className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center cursor-pointer select-none"
                        >
                            U
                        </div>


                        {open && (
                            <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg">
                                <Link to='/path'> <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    saved paths
                                </div>
                                </Link>
                                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500" onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav >
    );
};

export default Navbar;
