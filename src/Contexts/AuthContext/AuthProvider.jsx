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
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";

import AuthContext from "./AuthContext";
import { auth, db } from "../../Firebase/Firebase.init";


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);


    // ==========================================
    // REGISTER
    // ==========================================

    const registerUser = (email, password) => {

        return createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    };


    // ==========================================
    // LOGIN
    // ==========================================

    const loginUser = (email, password) => {

        return signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    };


    // ==========================================
    // LOGOUT
    // ==========================================

    const logoutUser = () => {

        return signOut(auth);

    };


    // ==========================================
    // AUTH STATE
    // ==========================================

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            async (currentUser) => {

                setUser(currentUser);

                if (!currentUser) {

                    setUserData(null);
                    setLoading(false);

                    return;
                }


                try {

                    // ==========================================
                    // GET USER DOCUMENT
                    // ==========================================

                    const userRef = doc(
                        db,
                        "users",
                        currentUser.uid
                    );

                    const userSnapshot = await getDoc(
                        userRef
                    );


                    if (!userSnapshot.exists()) {

                        setUserData(null);
                        setLoading(false);

                        return;
                    }


                    const firestoreUserData =
                        userSnapshot.data();


                    // ==========================================
                    // DEFAULT USER DATA
                    // ==========================================

                    let finalUserData = {
                        ...firestoreUserData,
                    };


                    // ==========================================
                    // GET RESTAURANT
                    // OWNER / KITCHEN
                    // ==========================================

                    if (
                        firestoreUserData.role === "owner" ||
                        firestoreUserData.role === "kitchen"
                    ) {

                        try {

                            // ----------------------------------
                            // FIRST: IF restaurantId ALREADY EXISTS
                            // ----------------------------------

                            if (
                                firestoreUserData.restaurantId
                            ) {

                                finalUserData = {
                                    ...finalUserData,
                                    restaurantId:
                                        firestoreUserData.restaurantId,
                                };

                            } else {

                                // ----------------------------------
                                // FIND RESTAURANT BY OWNER ID
                                // ----------------------------------

                                const restaurantQuery =
                                    query(
                                        collection(
                                            db,
                                            "restaurants"
                                        ),
                                        where(
                                            "ownerId",
                                            "==",
                                            currentUser.uid
                                        )
                                    );


                                const restaurantSnapshot =
                                    await getDocs(
                                        restaurantQuery
                                    );


                                if (
                                    !restaurantSnapshot.empty
                                ) {

                                    const restaurantDoc =
                                        restaurantSnapshot.docs[0];

                                    const restaurantData =
                                        restaurantDoc.data();


                                    finalUserData = {
                                        ...finalUserData,

                                        restaurantId:
                                            restaurantData.restaurantId,

                                        restaurantName:
                                            restaurantData.restaurantName,

                                        ownerId:
                                            restaurantData.ownerId,

                                    };

                                }

                            }

                        } catch (restaurantError) {

                            console.error(
                                "Restaurant loading error:",
                                restaurantError
                            );

                        }

                    }


                    // ==========================================
                    // SET USER DATA
                    // ==========================================

                    setUserData(
                        finalUserData
                    );


                } catch (error) {

                    console.error(
                        "Error loading user data:",
                        error
                    );

                    setUserData(null);

                } finally {

                    setLoading(false);

                }

            }
        );


        return () => unsubscribe();

    }, []);


    // ==========================================
    // AUTH INFO
    // ==========================================

    const authInfo = {

        user,
        userData,
        loading,

        registerUser,
        loginUser,
        logoutUser,

    };


    return (
        <AuthContext.Provider
            value={authInfo}
        >
            {children}
        </AuthContext.Provider>
    );

};


export default AuthProvider;