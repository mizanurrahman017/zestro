import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";


const PrivateRoute = ({
    children,
    allowedRole
}) => {

    const {
        user,
        userData,
        loading
    } = useAuth();


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-[#F7F5EF]
            ">

                <span className="
                    loading
                    loading-spinner
                    loading-lg
                "></span>

            </div>
        );

    }


    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // ==========================================
    // ROLE CHECK
    // ==========================================

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


    // ==========================================
    // ACCESS GRANTED
    // ==========================================

    return children;

};


export default PrivateRoute;