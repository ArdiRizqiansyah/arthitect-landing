/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useMemo, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : {};
    });

    const login = (userData) => {
        console.log(userData);
        // Simpan data pengguna setelah berhasil login
        setAuth(userData);
    };

    useEffect(() => {
        // Simpan data autentikasi ke localStorage setiap kali auth berubah
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    const logout = () => {
        // hapus data autentikasi dari localStorage
        localStorage.removeItem('auth');

        // hapus data autentikasi dari state
        setAuth({});    
    };

    const value = useMemo(
        () => ({
            auth,
            login,
            logout
        }),
        [auth]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
