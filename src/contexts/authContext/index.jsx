import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) { 
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setUserLoggedIn(!!user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    function logout() {
        return auth.signOut();
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        login,
        logout 
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
