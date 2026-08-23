import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";

const PrivateRoute = ({ children, allowedRole }) => {

    const {
        user,
        userData,
        loading
    } = useAuth();


    // Firebase user information loading
    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F5EF]">

                <span className="loading loading-spinner loading-lg"></span>

            </div>
        );

    }


    // Not logged in
    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // Role check
    if (
        allowedRole &&
        userData?.role !== allowedRole
    ) {

        return (
            <Navigate
                to="/"
                replace
            />
        );

    }


    return children;
};

export default PrivateRoute;