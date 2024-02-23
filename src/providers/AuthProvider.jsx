import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import auth from "./firebase.config";
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider;
    const axiosPublic = useAxiosPublic();
    const continueWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const signup = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userUpdateProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false)
                    }
                })
            } else {
                localStorage.removeItem('access-token');
                setLoading(false)

            }
            setLoading(false)
        });
        return (() => {
            unSubscribe();
        })
    }, [axiosPublic])




    const AuthInfo = {
        user,
        loading,
        signup,
        userUpdateProfile,
        continueWithGoogle,
        login,
        logOut
    }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;