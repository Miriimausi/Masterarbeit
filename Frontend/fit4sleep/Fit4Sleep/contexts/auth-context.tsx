import {createContext, useState} from "react";

export type AuthContextType = {
    isLoggedIn: boolean,
    isOnBoarded: boolean,
    setIsOnBoarded: any,
    userId: number | null,
    login: (username: string, password: string) => any,
    logout: () => void,

    username: string | null,

    password: string| null,

    email: string | null
}

const AuthContext = createContext<AuthContextType | null>( {
    isLoggedIn: false,
    isOnBoarded: false,
    setIsOnBoarded: () => {},
    userId: null,
    username: null,
    password: null,
    email: null,
    login: () => {},
    logout: () => {}
})

const AuthProvider = ({children}: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isOnBoarded, setIsOnBoarded] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

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
            setEmail(data.user.email);
            setPassword(data.user.password);
            setUsername(data.user.username)
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
            userId: userId,
            username: username,
            email: email,
            password: password
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider};