import {createContext, useState} from "react";

export type AuthContextType = {
    isLoggedIn: boolean,
    isOnBoarded: boolean,
    setIsOnBoarded: any,
    userId: number | null,
    login: (username: string, password: string) => any,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType | null>( {
    isLoggedIn: false,
    isOnBoarded: false,
    setIsOnBoarded: () => {},
    userId: null,
    login: () => {},
    logout: () => {}
})

const AuthProvider = ({children}: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isOnBoarded, setIsOnBoarded] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null);

    const login = async (username: string, password: string) => {
        const response = await fetch('http://10.0.2.2:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        const data = await response.json();
        if (data.success) {
            setIsLoggedIn(data.success);
            setUserId(data.user.id)
            setIsOnBoarded(data.user.isOnBoarded);
        } else {
            console.log('You could not log in');
        }
            // setIsLoggedIn(true);
    }

    const logout = () => {
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
            isOnBoarded: isOnBoarded,
            setIsOnBoarded: setIsOnBoarded,
            userId: userId
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider};