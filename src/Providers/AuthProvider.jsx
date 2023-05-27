import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../Firebase/Firebase.config";


export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)


    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(email, password)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }
    
    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('user', currentUser);
            setLoading(false)
        });
        return ()=>{
            return unsubscribe()
        }
    },[])

    const AuthInfo ={
        user,
        loading,
        createUser,
        singIn,
        logOut

    }
    
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;