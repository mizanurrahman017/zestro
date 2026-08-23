import React, { useEffect, useState } from "react";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import {
    doc,
    getDoc,
} from "firebase/firestore";

import AuthContext from "./AuthContext";
import { auth, db } from "../../Firebase/Firebase.init";


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);


    // =========================
    // Register
    // =========================

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
    };


    // =========================
    // Login
    // =========================

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    };


    // =========================
    // Logout
    // =========================

    const logoutUser = () => {
        return signOut(auth);
    };


    // =========================
    // Auth State
    // =========================

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            async (currentUser) => {

                setUser(currentUser);

                if (currentUser) {

                    try {

                        const userRef = doc(
                            db,
                            "users",
                            currentUser.uid
                        );

                        const userSnapshot = await getDoc(userRef);

                        if (userSnapshot.exists()) {

                            setUserData(userSnapshot.data());

                        } else {

                            setUserData(null);

                        }

                    } catch (error) {

                        console.error(
                            "Error loading user data:",
                            error
                        );

                        setUserData(null);
                    }

                } else {

                    setUserData(null);

                }

                setLoading(false);
            }
        );


        return () => unsubscribe();

    }, []);


    // =========================
    // Auth Info
    // =========================

    const authInfo = {

        user,
        userData,
        loading,

        registerUser,
        loginUser,
        logoutUser,

    };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;