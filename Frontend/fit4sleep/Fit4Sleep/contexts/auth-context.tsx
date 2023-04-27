import {createContext, useState} from "react";

export type AuthContextType = {
    isLoggedIn: boolean,
    login: (username: string, password: string) => any,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType | null>( {
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
})

const AuthProvider = ({children}: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
            return data.success;
        } else {
            console.log('You could not log in');
        }
    }

    const logout = () => {
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider};