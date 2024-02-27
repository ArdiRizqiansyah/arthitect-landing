import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const ProtectedLayout = () => {
    const { auth } = useAuth();

    if (!auth || !auth.token) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Outlet/>
        </>
    );
}