// import React, { createContext, useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
//
// type AuthContextType = {
//     isLoggedIn: boolean;
//     login: () => void;
//     logout: () => void;
//     user: firebase.User | null;
// };
//
// export const AuthContext = createContext<AuthContextType>({
//     isLoggedIn: false,
//     login: () => {},
//     logout: () => {},
//     user: null,
// });
//
// export const AuthProvider: React.FC = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [user, setUser] = useState<firebase.User | null>(null);
//
//     useEffect(() => {
//         const unsubscribe = firebase.auth().onAuthStateChanged(user => {
//             if (user) {
//                 setIsLoggedIn(true);
//                 setUser(user);
//             } else {
//                 setIsLoggedIn(false);
//                 setUser(null);
//             }
//         });
//
//         return unsubscribe;
//     }, []);
//
//     const login = () => {
//         const provider = new firebase.auth.GoogleAuthProvider();
//         firebase.auth().signInWithRedirect(provider);
//     };
//
//     const logout = () => {
//         firebase.auth().signOut();
//     };
//
//     return (
//         <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
