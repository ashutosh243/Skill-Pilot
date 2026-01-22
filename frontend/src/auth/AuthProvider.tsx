import { useEffect, useState, } from "react";
import axios, { AxiosError } from "axios";
import type { ReactNode } from "react";
import { authcontext } from "../context/context";
import type { authState } from "../context/context";
import config from "../config/config";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [auth, setAuth] = useState<authState>({ isAuthenticated: false, user: null, loading: true });
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const { data } = await axios.post(`${config.backendEndpoint}/api/v1/auth/me`, {}, { withCredentials: true });
                setAuth({ isAuthenticated: data.isAuthenticated, user: data.user, loading: false });
            }
            catch (e) {

                if (e instanceof AxiosError && e.response?.status === 401) {
                    setAuth({ isAuthenticated: false, user: null, loading: false });
                    return;
                }
            }
        }
        fetchAuth();
    }, []);

    return <>
        <authcontext.Provider value={{ auth, setAuth }}>
            {children}
        </authcontext.Provider>
    </>
}
export default AuthProvider;


