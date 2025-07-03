import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL + "/auth";

interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: { email: string; password: string }) => Promise<void>;
    register: (userData: { username: string; email: string; password: string }) => Promise<void>;
    logout: () => void;
    loginError: string | null;
    registerError: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [registerError, setRegisterError] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                setIsLoading(true);
                try {
                    const res = await axios.get(`${API_URL}/me`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(res.data);
                } catch (err) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setToken(null);
                    setUser(null);
                } finally {
                    setIsLoading(false);
                }
            }
        }

        verifyToken();
    }, [token])

    const login = async (data: { email: string, password: string }) => {
        try {
            const res = await axios.post(API_URL + '/login', data);
            setUser(res.data.user);
            setToken(res.data.token);

            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('token', res.data.token);

        } catch (err: any) {
            console.log(err);
            const message = err.response?.data?.error || 'Something went wrong. Please try again.';
            setLoginError(message);
            throw new Error(message);
        }
    }

    const register = async (userData: { username: string, email: string, password: string }) => {
        try {
            const res = await axios.post(`${API_URL}/register`, userData);
            setUser(res.data.user);
            setToken(res.data.token);

            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('token', res.data.token);
        } catch (err: any) {
            const message = err.response?.data?.error || 'Something went wrong. Please try again.'
            setRegisterError(message);
            throw new Error(message);
        }

    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    }
    return <AuthContext.Provider value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        loginError,
        registerError
    }}>{children}</AuthContext.Provider>

};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}